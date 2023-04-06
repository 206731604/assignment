<template>
	<div class="login">
		<header>
			<div class="icon" @click="jump" v-show="show">
				<van-icon name="arrow-left" />
			</div>
			<div class="title">会员登录</div>
			<div class="icon" style="opacity: 0" v-show="show">
				<van-icon name="arrow-left" />
			</div>
		</header>
		<main>
			<el-form
				:model="dynamicValidateForm"
				ref="dynamicValidateForm"
				class="demo-dynamic">
				<el-form-item
					prop="cellphone"
					:rules="[
						{
							required: true,
							message: '请输入手机号',
							trigger: 'blur',
						},
						{
							pattern: /^1[3-9]\d{9}$/,
							message: '请输入正确的手机号',
							trigger: ['blur'],
						},
					]">
					<el-input
						v-model="dynamicValidateForm.cellphone"
						placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item
					prop="password"
					:rules="{
						message: '密码不能为空',
						trigger: 'blur',
					}">
					<el-input
						v-model="dynamicValidateForm.password"
						placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						style="width: 100%"
						type="danger"
						@click="submitForm('dynamicValidateForm')"
						>提交</el-button
					>
				</el-form-item>
			</el-form>
		</main>
	</div>
</template>

<script>
import { Login } from "@/api";
export default {
	data() {
		return {
			show: true,
			dynamicValidateForm: {
				password: "",
				cellphone: "",
			},
		};
	},
	created() {},
	methods: {
		jump() {
			this.$router.push({
				name: this.$route.params.path,
			});
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					Login(this.dynamicValidateForm).then(res => {
						localStorage.token = res.data.auth_token;
						localStorage.nickname = res.data.nickname;
						localStorage.uid = res.data.uid;
						this.$router.push({
							name: this.$route.params.path,
						});
						console.log(this.$route);
					});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
	},
};
</script>

<style lang="less" scoped>

.login {
	display: flex;
	flex-direction: column;
	background: #fff;
	header {
		background: #fff;
		padding: 0.2667rem 0.2667rem;
		display: flex;
		font-size: 0.5333rem;
		align-items: center;
		.title {
			flex: 1;
			text-align: center;
		}
		justify-content: space-between;
		border-bottom: 1px solid #ccc;
	}
	main {
		flex: 1;
		padding: 10px 20px;
	}
}
</style>

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
				label-width="100px"
				class="demo-dynamic">
				<el-form-item
					prop="email"
					:rules="[
						{
							required: true,
							message: '请输入邮箱地址',
							trigger: 'blur',
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: ['blur', 'change'],
						},
					]">
					<el-input v-model="dynamicValidateForm.email"></el-input>
				</el-form-item>
				<el-form-item
					prop="value"
					:rules="{
						message: '域名不能为空',
						trigger: 'blur',
					}">
					<el-input v-model="dynamicValidateForm.value"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="submitForm('dynamicValidateForm')"
						>提交</el-button
					>
				</el-form-item>
			</el-form>
		</main>
	</div>
</template>

<script>
export default {
	data() {
		return {
			show: true,
			dynamicValidateForm: {
				value: "",

				email: "",
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
					alert("submit!");
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
	},
};
</script>

<style lang="less">
.login {
	display: flex;
	flex-direction: column;
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
	}
}
</style>

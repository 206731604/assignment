<template>
	<div class="phone">
		<Header fontSize=".8rem">
			<template v-slot:left
				><van-icon name="arrow-left" @click="back"
			/></template>
			<template v-slot:title><p>绑定手机</p></template>
			<template v-slot:right
				><i style="visibility: hidden">151</i></template
			>
		</Header>
		<main>
			<van-notice-bar
				color="#ac7700"
				background="#f3f5c4"
				left-icon="info-o">
				新手机号验证后，即可绑定成功！
			</van-notice-bar>
			<div class="alter">
				<el-input v-model="value" placeholder="绑定手机号"></el-input>
				<el-input v-model="value" placeholder="请输入短信验证码">
					<template slot="append">
						<div class="getCode">获取验证码</div>
					</template>
				</el-input>
			</div>
		</main>
	</div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
	data() {
		return {
			value: "",
		};
	},
	methods: {
		back() {
			this.$router.push("/my");
		},
	},
	components: {
		Header,
	},
};
</script>

<style lang="less">
.phone {
	display: flex;
	flex-direction: column;
	p {
		font-size: 0.6667rem;
	}
	main {
		flex: 1;
		font-size: 0.8rem;
		overflow: auto;
	}
}
</style>

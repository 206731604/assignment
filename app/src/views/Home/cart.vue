<template>
	<div class="cart">
		<header>
			<div class="icon" @click="jump" v-show="show">
				<van-icon name="arrow-left" />
			</div>
			<div class="title">购物车</div>
			<div class="icon" style="opacity: 0" v-show="show">
				<van-icon name="arrow-left" />
			</div>
		</header>
		<main></main>
		<footer>
			<van-submit-bar :price="3050" @submit="onSubmit">
				<van-checkbox v-model="checked">全选</van-checkbox>
				<template v-slot:button>
					<van-button type="danger" disabled>去结算</van-button>
				</template>
			</van-submit-bar>
		</footer>
	</div>
</template>

<script>
export default {
	data() {
		return { checked: false, show: true };
	},
	created() {
		this.show = !(JSON.stringify(this.$route.query) == "{}");
	},
	methods: {
		onSubmit() {},
		jump() {
			this.$router.push({
				name: this.$route.query.form,
				params: {
					path: this.$route.params.path,
				},
				query: {
					gid: this.$route.params.gid,
				},
			});
		},
	},
};
</script>

<style lang="less">
.cart {
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
		overflow: auto;
	}
}
footer {
	position: relative;
}
.van-submit-bar {
	position: absolute;
}
.van-submit-bar__bar {
	padding: 0;
}
</style>

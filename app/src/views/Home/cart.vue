<template>
	<div class="cart">
		<header>购物车</header>
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
		return {};
	},
	methods: {
		onSubmit() {},
	},
};
</script>

<style lang="less">
.cart {
	display: flex;
	flex-direction: column;
	header {
		background: #fff;
		padding: 10px 0;
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

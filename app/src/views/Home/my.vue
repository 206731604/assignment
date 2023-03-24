<template>
	<div class="my">
		<header>个人中心</header>
		<main>
			<div class="head-box">
				<div class="img-box">
					<img src="" alt="" />
				</div>
				<div class="message">
					<div class="title"></div>
					<div class="integral"></div>
				</div>
			</div>
			<div class="order-form-box">
				<div class="top">
					<div class="left">全部订单</div>
					<div class="right">查看全部订单</div>
				</div>
				<div class="down"></div>
			</div>
			<div class="list-box">
				<div></div>
			</div>
		</main>
	</div>
</template>

<script>
export default {
	data() {
		return {
			nav: [
				{
					icon: "el-icon-video-camera-solid",
					title: "待支付",
					status: 0,
				},
				{
					icon: "el-icon-shopping-cart-1",
					title: "待收货",
					status: 1,
				},
				{
					icon: "<van-icon name='fire-o' />",
					title: "待评价",
					status: 2,
				},
			],
		};
	},
};
</script>

<style lang="less">
.my {
	display: flex;
	flex-direction: column;
	header {
		padding: 10px 0;
		background: #fff;
	}
	main {
		flex: 1;
		overflow: auto;
	}
}
</style>

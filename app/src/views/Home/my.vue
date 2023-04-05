<template>
	<div class="my">
		<header>个人中心</header>
		<main>
			<div class="head-box">
				<div class="img-box">
					<img :src="headPortrait" alt="" />
				</div>
				<div class="message">
					<div class="title">{{ title }}</div>
					<div class="integral">我的积分:{{ integral }}</div>
				</div>
			</div>
			<div class="order-form-box">
				<div class="top">
					<div class="left">全部订单</div>
					<div class="right">
						查看全部订单<i class="el-icon-arrow-right"></i>
					</div>
				</div>
				<div class="down">
					<div v-for="(v, i) in nav" :key="i">
						<div :class="['icon', v.icon]"></div>
						<div class="title">{{ v.title }}</div>
					</div>
				</div>
			</div>
			<div class="list-box">
				<div v-for="(v, i) in list" :key="i">
					<div class="title">{{ v.title }}</div>
					<div :class="['icon', v.icon]"></div>
				</div>
				<button @click="loggingStatus">{{ ButtonText }}</button>
			</div>
		</main>
	</div>
</template>

<script>
import head from "@/assets/head.png";
import { user } from "@/api";
export default {
	data() {
		return {
			headPortrait: head,
			title: "昵称",
			integral: "0",
			ButtonText: "登录/注册",
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
					icon: "el-icon-orange",
					title: "待评价",
					status: 2,
				},
			],
			list: [
				{
					icon: "el-icon-arrow-right",
					title: "个人资料",
				},
				{
					icon: "el-icon-arrow-right",
					title: "收货地址",
				},
				{
					icon: "el-icon-arrow-right",
					title: "绑定手机",
				},
				{
					icon: "el-icon-arrow-right",
					title: "修改密码",
				},
				{
					icon: "el-icon-arrow-right",
					title: "我的收藏",
				},
			],
		};
	},
	created() {
		this.ButtonText = localStorage.token ? "安全退出" : "登录/注册";
		this.title = localStorage.token ? localStorage.nickname : "昵称";
		user(localStorage.uid).then(res => {
			this.integral = res.data.points;
			this.headPortrait = localStorage.token ? res.data.head : head;
		});
	},
	methods: {
		loggingStatus() {
			if (this.ButtonText == "登录/注册") {
				this.$router.push({
					name: "/login",
					params: { path: this.$route.name },
				});
			} else if (this.ButtonText == "安全退出") {
				this.$dialog
					.confirm({
						message: "确认要退出吗？",
					})
					.then(() => {
						localStorage.removeItem("token");
					})
					.catch(() => {
						// on cancel
					});
			}
		},
	},
};
</script>

<style lang="less">
.my {
	display: flex;
	flex-direction: column;
	header {
		padding: 0.2667rem 0;
		background: #fff;
	}
	main {
		flex: 1;
		overflow: auto;
		.head-box {
			background: url(http://vueshop.glbuys.com/assets/img/mybg.7627611d.png)
				no-repeat;
			background-size: 100%;
			background-position: top;
			height: 3.7333rem;
			display: flex;
			padding: 0 0.5333rem;
			justify-content: flex-start;
			align-items: center;
			.img-box {
				border-radius: 50%;
				width: 2.1333rem;
				height: 2.1333rem;
				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.message {
				padding: 0 0.2667rem;
				text-align: left;
				color: #fff;
			}
		}
		.order-form-box {
			background: #fff;
			.top {
				display: flex;
				justify-content: space-between;
				padding: 0.2667rem 0.2667rem;
			}
			.down {
				display: flex;
				justify-content: space-around;
				padding: 0.2667rem 0;
				border-top: 1px solid #ccc;
				.icon {
					color: red;
					font-size: 0.5333rem;
				}
			}
		}
		.list-box {
			margin-top: 0.2667rem;
			background: #fff;
			> div {
				border-bottom: 1px solid #ccc;
				display: flex;
				justify-content: space-between;
				padding: 0.2667rem;
				.title {
					margin-left: 0.5333rem;
				}
			}
			button {
				margin: 0.2667rem 0;
				margin-bottom: 0.8rem;
				padding: 0.1333rem 1.6rem;
				background: red;
				border: none;
				color: #fff;
			}
		}
	}
}
</style>

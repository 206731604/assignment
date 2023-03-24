<template>
	<div class="About">
		<header ref="header">
			<div>
				<van-icon name="bars" size="30" />
			</div>
			<el-input v-model="input" placeholder="请输入宝贝名称"
				><i slot="prefix" class="el-input__icon el-icon-search"></i
			></el-input>
			<div>
				<template v-if="show">
					<div>
						<van-icon name="contact" size="30" />
					</div>
				</template>
				<template v-else><div>登录</div></template>
			</div>
		</header>
		<main @scroll="scroll">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="blue">
				<van-swipe-item v-for="(v, i) in banner" :key="i">
					<img :src="v.img || v.image" alt="" class="banner" />
				</van-swipe-item>
			</van-swipe>
			<nav>
				<div v-for="(v, i) in nav" :key="i">
					<img :src="v.img || v.image" alt="" />
					<p>{{ v.title }}</p>
				</div>
			</nav>
			<div class="shop-box" v-for="(v, i) in shop" :key="i">
				<div class="shop-title">{{ v.title }}</div>
				<van-grid>
					<van-grid-item v-for="(k, j) in v.items" :key="j">
						<van-image :src="k.img || k.image" />
						<p>{{ k.title }}</p>
					</van-grid-item>
				</van-grid>
			</div>
			<div class="list-box">
				<div class="list-title">
					<i class="el-icon-circle-plus" style="color: pink"></i
					>为您推荐
				</div>
				<div class="shop">
					<div v-for="(v, i) in list" :key="i">
						<img :src="v.image || v.img" alt="" />
						<div class="message">
							<div class="title">{{ v.title }}</div>
							<div class="price">￥{{ v.price }}</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>
<script>
import { banner, nav, goodsLevel, list } from "@/api";
export default {
	data() {
		return {
			banner: [],
			show: true,
			input: "",
			nav: [],
			shop: [],
			list: [],
		};
	},
	created() {
		banner().then(res => {
			this.banner = res.data;
		});
		nav().then(res => {
			this.nav = res.data;
		});
		goodsLevel().then(res => {
			this.shop = res.data;
		});
		list().then(res => {
			this.list = res.data;
		});
	},
	methods: {
		scroll(e) {
			// console.log(e);
			if (e.target.scrollTop > 120) {
				this.$refs.header.className = "scroll";
			} else {
				this.$refs.header.className = "";
			}
		},
	},
};
</script>
<style lang="less">
.About {
	display: flex;
	flex-direction: column;
	position: relative;
	header {
		display: flex;
		align-items: center;
		position: absolute;
		padding: 5px 0;
		z-index: 99;
		color: #fff;
		background: -webkit-gradient(
			linear,
			left top,
			left bottom,
			from(rgba(1, 1, 1, 0.2)),
			to(hsla(0, 0%, 100%, 0))
		);
		background: linear-gradient(rgba(1, 1, 1, 0.2), hsla(0, 0%, 100%, 0));
		right: 0;
		left: 0;
		top: 0;
		> div {
			padding: 0 5px;
			div {
				white-space: nowrap;
			}
		}
	}
	.scroll {
		background: -webkit-gradient(
			linear,
			left top,
			left bottom,
			from(#eb1625),
			to(hsla(0, 0%, 100%, 0))
		);
		background: linear-gradient(#eb1625, hsla(0, 0%, 100%, 0));
	}
	main {
		flex: 1;
		overflow: auto;
		.banner {
			width: 100%;
			height: 100%;
		}
		nav {
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: #fff;
			padding: 10px 0;
		}
		.shop-box {
			margin-top: 15px;
			.shop-title {
				padding: 10px 0;
				background: #fff;
			}
			p {
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
			// img {
			// 	width: auto;
			// 	height: auto;
			// }
		}
		.list-box {
			.list-title {
				text-align: center;
				margin: 10px 0;
			}
			.shop {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				> div {
					width: 45%;
					background: #fff;
					margin-bottom: 10px;
					padding: 10px 5px 0;
					img {
						width: 90%;
					}
					.title {
						text-align: left;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.price {
						text-align: left;
						color: red;
					}
				}
			}
		}
	}
}
</style>

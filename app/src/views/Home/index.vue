<template>
	<div class="About">
		<header ref="header">
			<div>
				<van-icon name="bars" />
			</div>
			<el-input v-model="input" placeholder="请输入宝贝名称"
				><i slot="prefix" class="el-input__icon el-icon-search"></i
			></el-input>
			<div>
				<template v-if="show">
					<div>
						<van-icon name="contact" />
					</div>
				</template>
				<template v-else><div>登录</div></template>
			</div>
		</header>
		<main @scroll="scroll">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="blue">
				<van-swipe-item v-for="(v, i) in banner" :key="i">
					<img :src="v.img || v.image" alt="" />
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
				<van-grid square>
					<van-grid-item
						v-for="(k, j) in v.items"
						:key="j"
						:icon="k.img || k.image"
						:text="k.title" />
				</van-grid>
			</div>
		</main>
	</div>
</template>

<script>
import { banner, nav, goodsLevel } from "@/api";
export default {
	data() {
		return {
			banner: [],
			show: false,
			input: "",
			nav: [],
			shop: [],
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
		img {
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
			// img {
			// 	width: auto;
			// 	height: auto;
			// }
		}
	}
}
</style>

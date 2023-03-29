<template>
	<div class="item">
		<main>
			<div class="slideshow">
				<van-swipe
					class="my-swipe"
					:autoplay="1000"
					indicator-color="white">
					<van-swipe-item v-for="(v, i) in image" :key="i"
						><img :src="v" alt=""
					/></van-swipe-item>
				</van-swipe>
			</div>
			<div class="title-box">
				<div class="title">{{ title }}</div>
				<div class="price">￥{{ price }}</div>
				<div class="ExpressSales-box">
					<div class="express">快递：{{ freight }}元</div>
					<div class="sales">月销量{{ sales }}件</div>
				</div>
			</div>
		</main>
		<footer>
			<van-button color="orange">收藏</van-button>
			<van-button color="red" @click="show = true">加入购物车</van-button>
		</footer>
		<van-overlay :show="show" @click="show = false">
			<div class="suk-box" @click.stop>
				<div class="icon-box">
					<div class="icon" @click="show = false">
						<van-icon name="cross" />
					</div>
					<div class="line"></div>
					<div class="point"></div>
				</div>
				<div class="message-box">
					<div class="shop-message">
						<div class="left">
							<img :src="image[0]" alt="" />
							<img :src="image[0]" alt="" />
						</div>
						<div class="title-box">
							<div class="title">{{ title }}</div>
							<div class="price">￥{{ price }}</div>
							<div class="encipher-box">商品编码:{{ gid }}</div>
						</div>
					</div>
					<div class="information-box" v-for="(v, i) in suk" :key="i">
						<div class="title">{{ v.title }}</div>
						<div
							class="title-value"
							v-for="(k, j) in v.values"
							:key="j">
							<van-button type="default">{{
								k.value
							}}</van-button>
						</div>
					</div>
					<div class="purchase-num">
						<div class="left">购买数量</div>
						<div class="right">
							<van-stepper
								v-model="value"
								integer
								min="1"
								@change="magnitude" />
						</div>
					</div>
				</div>
				<van-button color="red" block>确定</van-button>
			</div>
		</van-overlay>
	</div>
</template>

<script>
import { info, spec } from "@/api";
export default {
	data() {
		return {
			image: [],
			title: "",
			gid: "",
			value: "",
			show: false,
			price: "",
			sales: "",
			freight: "",
			suk: "",
		};
	},
	created() {
		info(this.$route.query.gid).then(res => {
			this.image = res.data.images;
			this.gid = res.data.gid;
			this.title = res.data.title;
			this.price = res.data.price;
			this.sales = res.data.sales;
			this.freight = res.data.freight;
		});
		spec(this.$route.query.gid).then(res => {
			this.suk = res.data;
			console.log(res);
		});
	},
	methods: {
		magnitude(value) {
			this.value = value;
		},
	},
};
</script>

<style lang="less">
.item {
	display: flex;
	flex-direction: column;
	main {
		flex: 1;
		overflow: auto;
		.slideshow {
			width: 100%;
			background: #fff;
			img {
				width: 100%;
			}
		}
		.title-box {
			background: #fff;
			padding: 0.4rem 0.5333rem;
			.title {
				font-size: 0.4rem;
				text-align: left;
			}
			.price {
				color: red;
				font-size: 0.4rem;
				text-align: left;
				padding: 0.1333rem 0;
			}
			.ExpressSales-box {
				display: flex;
				justify-content: space-between;
				padding: 0.1333rem 0;
			}
		}
	}
	footer {
		display: flex;
		button {
			flex: 1;
		}
	}
	.suk-box {
		background: #fff;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		.icon-box {
			position: absolute;
			top: -0.7467rem;
			right: 0.1333rem;
			display: flex;
			align-items: center;
			flex-direction: column;
			.icon {
				background: #fff;
				border-radius: 50%;
				font-weight: 700;
			}
			.line {
				height: 0.5333rem;
				width: 0.0533rem;
				background: #fff;
			}
			.point {
				height: 0.1333rem;
				width: 0.1333rem;
				border-radius: 50%;
				background: #000;
			}
		}
		img {
			width: 10px;
		}
	}
}
</style>

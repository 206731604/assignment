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
			<div class="evaluate-box">
				<div class="title">商品评价（{{ total }}）</div>
				<div class="list-box" v-if="estimate != '没有数据'">
					<div v-for="(v, i) in estimate" :key="i">
						<div class="head-box">
							<div class="left">
								<img :src="v.head" alt="" />
							</div>
							<div class="right">{{ v.nickname }}</div>
						</div>
						<div class="content">{{ v.content }}</div>
						<div class="timer">{{ v.times }}</div>
					</div>
					<van-button plain hairline color="red" @click="jump"
						>查看更多评价</van-button
					>
				</div>
				<div v-else class="notAvailable">暂无评价！</div>
			</div>
		</main>
		<footer>
			<van-button color="orange" @click="fav">收藏</van-button>
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
							<transition name="bounce">
								<img
									:src="image[0]"
									v-if="cartoonShow"
									alt="" />
							</transition>
						</div>
						<div class="title-box">
							<div class="title">{{ title }}</div>
							<div class="price">￥{{ price }}</div>
							<div class="encipher-box">商品编码:{{ gid }}</div>
						</div>
					</div>
					<div class="information-box" v-for="(v, i) in suk" :key="i">
						<div class="title">{{ v.title }}</div>
						<div class="title-value">
							<button
								v-for="(k, j) in v.values"
								:key="j"
								@click="choice(v.title, k.value)"
								:class="{
									btn: true,
									active: k.check,
								}">
								{{ k.value }}
							</button>
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
				<van-button color="red" block @click="addCart">确定</van-button>
			</div>
		</van-overlay>
	</div>
</template>

<script>
import { info, spec, reviews, fav } from "@/api";
export default {
	data() {
		return {
			image: [],
			title: "",
			gid: "",
			total: "0",
			value: "",
			show: false,
			cartoonShow: true,
			price: "",
			sales: "",
			freight: "",
			suk: "",
			activeSuk: [],
			cart: [],
			estimate: [],
		};
	},
	created() {
		// console.log(JSON.parse(localStorage.getItem("cart")));
		try {
			this.cart = JSON.parse(localStorage.cart) || [];
		} catch (error) {
			this.cart = [];
		}
		info(this.$route.query.gid).then(res => {
			this.image = res.data.images;
			this.gid = res.data.gid;
			this.title = res.data.title;
			this.price = res.data.price;
			this.sales = res.data.sales;
			this.freight = res.data.freight;
		});
		reviews({ gid: this.$route.query.gid }).then(res => {
			try {
				this.total = res.pageinfo.total;
			} catch (error) {
				this.total = "0";
			}
			this.estimate = res.data;
		});
		spec(this.$route.query.gid).then(res => {
			res.data.forEach(v => {
				this.activeSuk.push({ title: v.title, value: "" });
				v.values.forEach(v => {
					v.check = false;
				});
			});
			this.suk = res.data;
		});
	},
	methods: {
		jump() {
			this.$router.push({
				name: "/goods/details/review",
				params: { path: this.$route.params.path },
				query: { gid: this.$route.query.gid },
			});
		},
		magnitude(value) {
			this.value = value;
		},
		choice(title, value) {
			this.suk.forEach((v, i) => {
				if (v.title == title) {
					v.values.forEach(v => {
						v.check = false;
						if (v.value == value) {
							this.activeSuk[i].value = v.value;
							v.check = true;
						}
					});
				}
			});
		},
		addCart() {
			for (let index = 0; index < this.activeSuk.length; index++) {
				if (this.activeSuk[index].value == "") {
					this.$toast({
						message: "请选择" + this.activeSuk[index].title,
					});
					return;
				}
			}
			this.cartoonShow = !this.cartoonShow;
			let index = this.cart.findIndex(v => v.gid == this.gid);
			if (this.cart.length) {
				if (index != -1) {
					this.cart[index].num += this.value * 1;
				} else {
					this.cart.push({
						image: this.image,
						title: this.title,
						gid: this.gid,
						num: this.value,
						price: this.price,
						sales: this.sales,
						freight: this.freight,
						suk: this.activeSuk,
					});
				}
			} else {
				this.cart.push({
					image: this.image,
					title: this.title,
					gid: this.gid,
					num: this.value,
					price: this.price,
					sales: this.sales,
					freight: this.freight,
					suk: this.activeSuk,
				});
			}
			localStorage.cart = JSON.stringify(this.cart);
			// localStorage.setItem("cart", JSON.stringify(this.cart));
		},
		fav() {
			fav({ uid: localStorage.uid, gid: this.gid }).then(res => {
				this.$toast(res.data);
			});
		},
	},
};
</script>

<style lang="less">
.item {
	display: flex;
	flex-direction: column;
	padding-top: 0.2667rem;
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
		.evaluate-box {
			margin-top: 0.5333rem;
			background: #fff;
			padding: 0 0.48rem;
			.title {
				text-align: left;
				font-size: 0.4267rem;
				padding: 0.1333rem;
			}
			.list-box {
				> div {
					text-align: left;
					margin-top: 0.2667rem;
					.head-box {
						display: flex;
						align-items: center;
						.left {
							width: 1.0667rem;
							height: 1.0667rem;
							border-radius: 50%;
							img {
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
						.right {
							padding: 0 0.4rem;
						}
					}
					.content {
						margin: 0.1333rem 0;
						font-size: 0.4267rem;
					}
				}
				padding-bottom: 0.5333rem;
			}
			.notAvailable {
				font-size: 0.5333rem;
				padding: 0.5333rem;
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
		.shop-message {
			display: flex;
			border-bottom: 1px solid #ccc;
			.left {
				position: relative;
				margin: 0.2667rem;
				width: 2.4rem;
				height: 1.3333rem;
				img {
					position: absolute;
					width: 100%;
					height: 100%;
					right: 0;
					left: 0;
					top: 0;
				}
			}
			.title-box {
				flex: 1;
				position: relative;
				text-align: left;
				margin-right: 0.4rem;
				.title {
					display: -webkit-box;
					-webkit-line-clamp: 2;
					font-size: 0.4rem;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
				.price {
					color: red;
					font-size: 0.4rem;
					margin: 0.1333rem 0;
				}
				.encipher-box {
					position: absolute;
					right: 0.4rem;
					bottom: 0;
				}
			}
		}
		.information-box {
			margin: 0.2667rem 0.4rem;
			.title {
				font-size: 0.4267rem;
				text-align: left;
			}
			.title-value {
				display: flex;
				margin: 0.2667rem 0;
				button {
					margin-right: 0.5333rem;
					padding: 0.1333rem 0.2667rem;
					border-radius: 0.1333rem;
					border: none;
				}
				.active {
					color: #fff;
					background-color: #fda208;
				}
			}
		}
		.purchase-num {
			display: flex;
			justify-content: space-between;
			margin: 0.2667rem 0.5333rem;
			align-items: center;
			font-size: 0.4267rem;
		}
	}
}
.bounce-enter-active {
	animation: bounce-out 0s;
}
.bounce-leave-active {
	animation: bounce-in 2s linear;
}
@keyframes bounce-in {
	100% {
		transform: translate(9.0667rem, -10.1333rem) rotate(3600deg);
		display: none;
	}
	0% {
		transform: translate(0px, 0px);
	}
}
@keyframes bounce-out {
	0% {
		transform: translate(9.0667rem, -10.1333rem) rotate(3600deg);
	}
	100% {
		transform: translate(0px, 0px);
	}
}
</style>

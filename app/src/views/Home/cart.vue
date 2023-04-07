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
		<main>
			<van-card :title="v.title" v-for="(v, i) in cart" :key="i">
				<template v-slot:thumb>
					<van-checkbox
						@click="radioCheck(v)"
						v-model="v.check"
						checked-color="red">
						<img :src="v.img || v.image[0] || v.image[1]" alt="" />
						<p @click.stop="del(v)">删除</p>
					</van-checkbox>
				</template>
				<template v-slot:desc>
					<span v-for="(k, j) in v.suk" :key="j">
						{{ k.title }}: {{ k.value }}
					</span>
				</template>
				<template v-slot:num>
					<van-stepper
						v-model="v.num"
						min="1"
						:name="i"
						@change="Change" />
				</template>
				<template v-slot:price>￥{{ v.price }} </template>
			</van-card>
		</main>
		<footer>
			<van-submit-bar
				:price="price"
				decimal-length="1"
				@submit="onSubmit">
				<van-checkbox
					v-model="checked"
					@click="checkAll"
					checked-color="red"
					>全选</van-checkbox
				>
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
		return {
			checked: false,
			show: true,
			cart: [],
		};
	},
	created() {
		this.show = !(JSON.stringify(this.$route.query) == "{}");
		this.cart = JSON.parse(localStorage?.cart) || [];
		// console.log(this.cart);
		this.checked = this.cart.length ? this.cart.every(v => v.check) : false;
	},
	computed: {
		price() {
			let price = 0;
			this.cart.forEach(v => {
				if (v.check) {
					price += v.price * v.num;
				}
			});
			price = `${price.toFixed(2)}`.split(".").join("");
			return price * 1;
		},
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
		Change(val, { name }) {
			this.cart[name].num = val;
			localStorage.cart = JSON.stringify(this.cart);
		},
		radioCheck(item) {
			let index = this.cart.findIndex(v => {
				return (
					v.gid == item.gid &&
					JSON.stringify(v.suk) == JSON.stringify(item.suk)
				);
			});
			this.cart[index].check = this.cart[index].check;
			this.checked = this.cart.every(v => v.check);
			localStorage.cart = JSON.stringify(this.cart);
		},
		checkAll() {
			this.checked = !this.checked;
			this.checked = !this.checked;
			this.cart.forEach(v => {
				v.check = this.checked;
			});
			localStorage.cart = JSON.stringify(this.cart);
		},
		del(value) {
			let index = this.cart.findIndex(
				v => JSON.stringify(v) == JSON.stringify(value)
			);
			this.cart.splice(index, 1);
			localStorage.cart = JSON.stringify(this.cart);
		},
	},
	watch: {
		cart: function (newVal, oldVal) {
			// console.log(newVal);
		},
		deep: true,
	},
};
</script>

<style lang="less">
.cart {
	display: flex;
	flex-direction: column;
	text-align: left;

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
		img {
			width: 100%;
		}
		p {
			text-align: center;
		}
	}
	footer {
		position: relative;
	}
}
.van-card {
	background: #fff;
}
.van-submit-bar {
	position: relative;
}

.van-card__thumb {
	height: auto;
	background: #fff;
}

.van-submit-bar__bar {
	padding: 0 0 0 0.2667rem;
}
</style>

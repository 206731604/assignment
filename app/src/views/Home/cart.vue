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
					<van-checkbox v-model="v.check">
						<img :src="v.img || v.image[0] || v.image[1]" alt="" />
						<p>删除</p>
					</van-checkbox>
				</template>
				<template v-slot:desc>
					<span v-for="(k, j) in v.suk" :key="j">
						{{ k.title }}: {{ k.value }}
					</span>··
				</template>
				<template v-slot:num>

					 </template>
				<template v-slot:price>￥{{ v.price }} </template>
			</van-card>
		</main>
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
		return {
			checked: false,
			show: true,
			cart: [],
		};
	},
	created() {
		this.show = !(JSON.stringify(this.$route.query) == "{}");
		this.cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
		console.log(this.cart);
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

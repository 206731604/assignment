<template>
	<div class="home">
		<section>
			<router-view />
		</section>
		<footer>
			<div v-for="(v, i) in nav" :key="i" @click="containers = v.path">
				<router-link
					:to="v.path"
					:class="{ active: v.path == containers }">
					<van-icon :name="v.icon" size="20" />
					<p>{{ v.title }}</p>
				</router-link>
			</div>
		</footer>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: "HomeView",
	data() {
		return {
			nav: [
				{
					title: "首页",
					icon: "wap-home-o",
					path: "/index",
				},
				{
					title: "购物车",
					icon: "shopping-cart-o",
					path: "/cart",
				},
				{
					title: "我的",
					icon: "user-o",
					path: "/my",
				},
			],
			containers: "/index",
		};
	},
	watch: {
		$route: function (newVal, oldVal) {
			this.containers = newVal.fullPath;
		},
	},
	created() {
		this.containers = this.$route.path;
	},
};
</script>
<style lang="less">
.home {
	display: flex;
	flex-direction: column;
	section {
		flex: 1;
		overflow: auto;
		> div {
			height: 100%;
			width: 100%;
		}
	}
	footer {
		display: flex;
		justify-content: space-around;
		background: #fff;
		padding: 5px 0;
		a {
			color: #000;
		}
		.active {
			color: red;
		}
	}
}
</style>

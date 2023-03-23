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
					path: "/index",
				},
				{
					title: "购物车",
					path: "/cart",
				},
				{
					title: "我的",
					path: "/my",
				},
			],
			containers: "/index",
		};
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
	}
	footer {
		display: flex;
		justify-content: space-around;
		padding: 5px 0;
		.active {
			p {
				color: red;
			}
		}
	}
}
</style>

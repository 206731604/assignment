<template>
	<div class="details">
		<header>
			<div class="icon" @click="back"><van-icon name="arrow-left" /></div>
			<nav>
				<div
					v-for="(v, i) in nav"
					:key="i"
					:class="v.path == path ? 'active' : ''"
					@click="jump(v.path)">
					{{ v.title }}
				</div>
			</nav>
			<div class="icon"><van-icon name="cart-o" /></div>
		</header>
		<main>
			<router-view />
		</main>
	</div>
</template>

<script>
export default {
	data() {
		return {
			path: "/goods/details/item",
			nav: [
				{
					title: "商品",
					path: "/goods/details/item",
				},
				{
					title: "详情",
					path: "/goods/details/content",
				},
				{
					title: "评价",
					path: "/goods/details/review",
				},
			],
			gid: "",
			params: "",
		};
	},
	created() {
		this.params = this.$route.params.path;
		this.gid = this.$route.query.gid;
		this.path = this.$route.name;
	},
	methods: {
		jump(path) {
			this.path = path;
			this.$router.push({
				name: path,
				params: { path },
				query: { gid: this.gid },
			});
		},
		back() {
			if (this.params) {
				this.$router.push(this.params);
			} else {
				this.$router.push("/");
			}
		},
	},
};
</script>

<style lang="less" scoped>
.details {
	display: flex;
	flex-direction: column;
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.2667rem;
		background: #fff;
		.icon {
			font-size: 0.8rem;
		}
		nav {
			display: flex;
			width: 70%;
			> div {
				flex: none;
				height: 1.0667rem;
				line-height: 1.0667rem;
				font-size: 0.5333rem;
				color: #000;
				margin: 0 9%;
				border-bottom: 2px solid #fff;
				a {
					color: #000;
				}
			}
			.active {
				border-bottom: 2px solid orange;
			}
		}
	}
	main {
		flex: 1;
		overflow: auto;
		> div {
			width: 100%;
			height: 100%;
		}
	}
}
</style>

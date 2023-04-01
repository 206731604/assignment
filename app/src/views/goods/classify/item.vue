<template>
	<div class="item">
		<header>
			<div class="icon" @click="back">
				<van-icon name="arrow-left" size="30" />
			</div>
			<el-input v-model="input" placeholder="请输入宝贝名称"></el-input>
			<div class="icon"></div>
		</header>
		<main>
			<div class="left">
				<div
					v-for="(v, i) in menu"
					:key="i"
					@click="show(v.cid)"
					:class="cid == v.cid ? 'active' : ''">
					{{ v.title }}
				</div>
			</div>
			<div class="right">
				<template v-if="shop != '没有数据'">
					<div v-for="(v, i) in shop" :key="i">
						<div class="title">{{ v.title }}</div>
						<div class="goods">
							<van-grid :column-num="3">
								<van-grid-item
									v-for="(j, k) in v.goods"
									:key="k"
									@click="details(j.gid)">
									<van-image :src="j.image" />
									<p>{{ j.title }}</p>
								</van-grid-item>
							</van-grid>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="NoCorrelation">没有相关商品！</div>
				</template>
			</div>
		</main>
	</div>
</template>

<script>
import { menu, show } from "@/api";
export default {
	data() {
		return {
			input: "",
			cid: "",
			menu: [],
			shop: [],
		};
	},
	created() {
		menu().then(res => {
			this.menu = res.data;
		});
		if (this.$route.query.cid != undefined) {
			this.cid = this.$route.query.cid;
			this.show(this.$route.query.cid);
		} else {
			this.show();
		}
	},
	watch: {
		$route: function (newVal, oldVal) {
			console.log(newVal);
		},
	},
	methods: {
		show(cid) {
			// if (cid != this.cid) {
			this.cid = cid ? cid : "492";
			this.$router.push({
				name: "/goods/classify/item",
				query: {
					cid,
				},
			});
			show(cid).then(res => {
				this.shop = res.data;
			});
			// }
		},
		back() {
			this.$router.replace("/");
		},
		details(gid) {
			let name = this.$route.name;
			this.$router.push({
				name: "/goods/details/item",
				params: { path: name },
				query: { gid },
			});
		},
	},
};
</script>

<style lang="less" scoped>
.item {
	display: flex;
	flex-direction: column;
	header {
		display: flex;
		align-items: center;
		background: #fff;
		padding: 0.1333rem 0;
		.icon {
			width: 0.9333rem;
		}
	}
	main {
		flex: 1;
		display: flex;
		overflow: auto;
		.left {
			margin-top: 0.0267rem;
			width: 2.4rem;
			height: 100%;
			overflow: auto;
			margin-right: 3%;
			> div {
				height: 1.0667rem;
				line-height: 1.0667rem;
				background: #fff;
				border-bottom: 1px solid #efefef;
			}
			.active {
				color: red;
			}
		}
		.right {
			width: 71%;
			height: 100%;
			overflow: auto;
			> div {
				.title {
					text-align: left;
					font-size: 0.4rem;
					margin: 0.2667rem 0;
				}
				.goods {
					background: #fff;
					padding: 0.2667rem 0;
					p {
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
						color: #000;
					}
				}
			}
			.NoCorrelation {
				font-size: 0.8rem;
			}
		}
	}
}
</style>

<template>
	<div v-infinite-scroll="load" infinite-scroll-immediate="false">
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
			</div>
			<div v-else class="notAvailable">暂无评价！</div>
		</div>
	</div>
</template>

<script>
import { info, spec, reviews } from "@/api";
export default {
	data() {
		return {
			total: "0",
			estimate: "",
			page: "1",
			pagenum: "3",
		};
	},
	created() {
		reviews({ gid: this.$route.query.gid }).then(res => {
			try {
				this.total = res.pageinfo.total;
				this.pagenum = res.pageinfo.pagenum;
			} catch (error) {
				this.total = "0";
			}
			this.estimate = res.data;
		});
	},
	methods: {
		load() {
			this.page = this.page * 1 + 1;
			if (this.page > this.pagenum) {
				return;
			}
			reviews({ gid: this.$route.query.gid, page: this.page }).then(
				res => {
					this.total = res.pageinfo.total;
					this.pagenum = res.pageinfo.pagenum;
					this.page = res.pageinfo.page * 1;
					this.estimate.push(...res.data);
				}
			);
		},
	},
};
</script>

<style lang="less">
div {
	overflow: auto;
}
.evaluate-box {
	overflow: auto;
	margin-top: 0.5333rem;
	background: #fff;
	padding: 0 0.48rem;
	.title {
		text-align: left;
		font-size: 0.4267rem;
		padding: 0.1333rem;
	}
	.list-box {
		height: 100%;
		// overflow: auto;
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
</style>

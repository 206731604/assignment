<template>
	<div v-html="bodys"></div>
</template>

<script>
import { info, spec, reviews } from "@/api";
export default {
	data() {
		return {
			bodys: "",
		};
	},
	created() {
		info(this.$route.query.gid).then(res => {
			this.bodys = res.data.bodys;
		});
	},
};
</script>

<style lang="less" scoped>
div {
	font-size: 0.4rem;
	padding: 0.1333rem 0.2667rem;
	text-align: left;
}
</style>

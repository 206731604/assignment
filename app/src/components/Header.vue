<template>
	<header :style="{ 'font-size': fontSize || '.5333rem' }">
		<div class="left">
			<slot name="left"></slot>
		</div>
		<div class="title">
			<slot name="title"></slot>
		</div>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</header>
</template>

<script>
export default {
	props: ["fontSize"],
};
</script>

<style lang="less" scoped>
header {
	background: #fff;
	border-bottom: 0.0533rem solid #ccc;
	display: flex;
	align-items: center;
	padding: 0.2667rem 0.1333rem;
	justify-content: space-between;
}
</style>

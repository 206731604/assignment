<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="less">
* {
	margin: 0;
	padding: 0;
	list-style: none;
	text-decoration: none;
	color: #000;
	outline: none;
}
::-webkit-scrollbar {
	display: none;
}
html,
body,
#app {
	height: 100%;
	width: 100%;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>

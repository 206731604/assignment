const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		host: "localhost",
		port: "3000",
		open: true,
		proxy: "http://vueshop.glbuys.com",
	},
});

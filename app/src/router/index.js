import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import user from "./user";
Vue.use(VueRouter);
// /goods/classify/item
const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
		children: user,
		redirect: "/index",
	},
	{
		path: "/goods",
		name: "/goods",
		component: () => import("@/views/goods"),
		children: [
			{
				path: "/goods/classify",
				name: "/goods/classify",
				component: () => import("@/views/goods/classify"),
				redirect: "/goods/classify/item",
				children: [
					{
						path: "/goods/classify/item",
						name: "/goods/classify/item",
						component: () => import("@/views/goods/classify/item"),
					},
				],
			},
			{
				path: "/goods/details",
				name: "/goods/details",
				component: () => import("@/views/goods/details"),
				children: [
					{
						path: "/goods/details/item",
						name: "/goods/details/item",
						component: () => import("@/views/goods/details/item"),
					},
					{
						path: "/goods/details/content",
						name: "/goods/details/content",
						component: () =>
							import("@/views/goods/details/content"),
					},
					{
						path: "/goods/details/review",
						name: "/goods/details/review",
						component: () => import("@/views/goods/details/review"),
					},
				],
			},
		],
	},
	{
		path: "/user",
		name: "/user",
		component: () => import("@/views/user"),
		children: [
			{
				path: "/user/order",
				name: "/user/order",
				component: () => import("@/views/user/order"),
				redirect: "/user/order/list",
				children: [
					{
						path: "/user/order/list",
						name: "/user/order/list",
						component: () => import("@/views/user/order/list"),
					},
					{
						path: "/user/order/review",
						name: "/user/order/review",
						component: () => import("@/views/user/order/review"),
					},
				],
			},
			{
				path: "/user/profile",
				name: "/user/profile",
				component: () => import("@/views/user/profile"),
			},
			{
				path: "/user/address",
				name: "/user/address",
				component: () => import("@/views/user/address"),
			},
			{
				path: "/user/bind_cellphone",
				name: "/user/bind_cellphone",
				component: () => import("@/views/user/cellphone"),
			},
			{
				path: "/user/mod_password",
				name: "/user/mod_password",
				component: () => import("@/views/user/password"),
			},
			{
				path: "/user/fav",
				name: "/user/fav",
				component: () => import("@/views/user/fav"),
			},
		],
	},
	{
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
	},
	{
		path: "/login",
		name: "/login",
		component: () => import("@/views/login"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;

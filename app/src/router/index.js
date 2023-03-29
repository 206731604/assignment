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
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;

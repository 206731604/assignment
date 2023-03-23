export default [
	{
		path: "/index",
		name: "index",
		component: () => import("@/views/Home"),
	},
	{
		path: "/my",
		name: "my",
		component: () => import("@/views/Home/my"),
	},
	{
		path: "/cart",
		name: "cart",
		component: () => import("@/views/Home/cart"),
	},
];

import ajax from "../utils";
export const banner = async () => {
	return await ajax.get("/api/home/index/slide");
};
export const Login = async data => {
	return await ajax.post("/api/home/user/pwdlogin", data);
};
export const user = async id => {
	return await ajax.get("/api/user/myinfo/userinfo/uid/" + id);
};
export const nav = async () => {
	return await ajax.get("/api/home/index/nav");
};
export const goodsLevel = async () => {
	return await ajax.get("/api/home/index/goodsLevel");
};
export const list = async () => {
	return await ajax.get("/api/home/index/recom");
};
export const menu = async () => {
	return await ajax.get("/api/home/category/menu");
};
export const show = async cid => {
	return await ajax.get("/api/home/category/show", { params: { cid } });
};
export const info = async gid => {
	return await ajax.get("/api/home/goods/info?type=details", {
		params: { gid },
	});
};
export const spec = async gid => {
	return await ajax.get("/api/home/goods/info?type=spec", {
		params: { gid },
	});
};
export const reviews = async params => {
	return await ajax.get("/api/home/reviews/index", {
		params,
	});
};
export const fav = async params => {
	return await ajax.get("/api/goods/fav", {
		params,
	});
};

import ajax from "../utils";
export const banner = async () => {
	return await ajax.get("/api/home/index/slide");
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

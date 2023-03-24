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

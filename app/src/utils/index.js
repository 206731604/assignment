import axios from "axios";
import qs from "qs";
const http = axios.create({
	// baseURL: "https://some-domain.com/api/",
	timeout: 1000,
	// headers: { token: "1ec949a15fb709370f" },
});
http.interceptors.request.use(config => {
	config.params = {
		...config.params,
		token: "1ec949a15fb709370f",
	};
	if (config.data && !(config.data instanceof FormData)) {
		config.data = qs.stringify(config.data);
	}
	return config;
});
http.interceptors.response.use(
	response => {
		let { data } = response;
		return data;
	},
	error => {
		if (error.code == "ECONNABORTED" && error.message.includes("timeout")) {
			error.config.num = (error.config.num || 0) + 1;
			error.config.timeout = error.config.timeout * 2;
			if (error.config.num > 2) {
				return Promise.reject(error);
			}
			return http(error.config);
		}
	}
);
export default http;

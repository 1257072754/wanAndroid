import Request from '@/js_sdk/luch-request/luch-request/index.js'

const http = new Request({
	//baseURL: "https://www.fastmock.site/mock/bf7e8913eee9604335d1cabc80bafcb3/uniapp", //设置请求的base url
	timeout: 60 * 100 * 10, //超时时长10s,
	header: {
		'Content-Type': 'multipart/form-data;application/json;charset=UTF-8;'
	}
})

//请求拦截器
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	// const token = uni.getStorageSync('token');
	// if (token) {
	// 	config.headers.common["Authorization"] = 'Bearer ' + token;
	// }

	if (config.method === 'POST') {
		config.data = JSON.stringify(config.data);
	}
	return config
}, error => {
	return Promise.resolve(error)
})

// 响应拦截器
http.interceptors.response.use((response) => {
	console.log("响应拦截器拦截的数据 == ", response)
	return response
}, (error) => {
	// //未登录时清空缓存跳转
	// if (error.statusCode == 401) {
	// 	uni.clearStorageSync();
	// 	uni.switchTab({
	// 		url: "/pages/index/index.vue"
	// 	})
	// }
	return Promise.resolve(error)
})
export default http;

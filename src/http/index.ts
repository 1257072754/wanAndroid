import request from '../http/httpload' //导入http下的httpload.js		/* 测试Api */
export default {
	// get请求 可以拼接url或者传入数据对象 二选一
	get(url, data) {
		// 传入的data对象  {ip:'121.00.00.01'}; 
		return request.get(url, { params: data });
	},
	// post请求
	post(url, data) {
		// 传入的data对象  {ip:'xxxxxx'}; 
		return request.post(url, data);
	},
	// put请求
	put(url, data) {
		// 传入的data对象  {ip:'xxxxxx'}; 
		return request.put(url, data);
	},
	// delete请求
	deleteData(url, data) {
		// 传入的data对象  {ip:'xxxxxx'}; 
		return request.delete(url, data);
	}
}

import http from "@/http/index";
import { resolve } from "dns";
import { rejects } from "assert";

export function getHotTabs() {
	return new Promise((resolve, rejects) => {
		http.get('https://www.fastmock.site/mock/bf7e8913eee9604335d1cabc80bafcb3/uniapp/uniapp/getTabsList', '')
			.then((res: any) => {
				resolve(res.data.data.list)
			})
			.catch((err: any) => {
				rejects(err)
			})
	})
}

export function getHotLists() {
	return new Promise((resolve, rejects) => {
		http.get('https://www.fastmock.site/mock/bf7e8913eee9604335d1cabc80bafcb3/uniapp/uniapp/getHotList', '')
			.then((res: any) => {
				resolve(res.data.data)
			})
			.catch((err: any) => {
				rejects(err)
			})
	})
}
export function getHotListByType(type: number) {
	return new Promise((resolve, rejects) => {
		http.get('https://www.fastmock.site/mock/bf7e8913eee9604335d1cabc80bafcb3/uniapp/uniapp/getHotListByType', { type: type })
			.then((res: any) => {
				resolve(res.data.data)
			})
			.catch((err: any) => {
				rejects(err)
			})
	})
}
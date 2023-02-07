import http from "@/http/index";
import { rejects } from "assert";
import { resolve } from "dns";
enum Api {
	login = 'https://www.wanandroid.com/user/login',
	home = 'https://www.wanandroid.com/article/list/0/json'
}
export interface ILogin {
	account: string,
	password: string,
}
export function requestLogin(parmas: any) {
	return new Promise((resolve, rejects) => {
		http.post(Api.login, { password: parmas.password, username: parmas.account })
			.then((res: any) => {
				resolve(res)
			})
			.catch((err: any) => {
				rejects(err)
			})
	})
}
export function getHome() {
	return new Promise((resolve, rejects) => {
		http.get(Api.home, '')
			.then((res: any) => {
				resolve(res)
			})
			.catch((err: any) => {
				rejects(err)
			})
	})
}
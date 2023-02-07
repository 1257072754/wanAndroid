<template>
	<view class="bg">
		<image class="logo" src="../../../static/images/ic_launcher_foreground.png" mode="aspectFit"></image>
	</view>
	<swiper :current="swiperCurrentIndex" style="height: 600rpx;">
		<swiper-item>
			<view style="display: flex;	align-items: center; justify-content: center; "
				@click="handleClick('registered')">
				<text style="color: #409eff;font-size: 17px;">去注册</text>
				<uni-icons type="forward" color="#409eff" size="16" />
			</view>
			<view class="list">
				<my-input inputType="account" v-model="login.account" @onInput="onInput($event ,'loginAccount')"
					@handleClear="handleClear('loginAccount','clear')" />
				<my-input inputType="password" v-model="login.password" @onInput="onInput($event,'loginPassword')"
					@handleClear="handleClear('loginPassword','clear')" />
			</view>
			<view class="button-login" hover-class="button-hover" @click="handleLogin(login,'input')">
				<text>登录</text>
			</view>

		</swiper-item>
		<swiper-item>
			<view style="display: flex;	align-items: center; justify-content: center; " @click="handleClick('login')">
				<uni-icons type="back" color="#409eff" size="16" />
				<text style="color: #409eff;font-size: 17px;">去登录</text>
			</view>
			<view class="list">
				<my-input inputType="account" v-model="registered.account"
					@onInput="onInput($event ,'registeredAccount')"
					@handleClear="handleClear('registeredAccount','clear')" />
				<my-input inputType="password" v-model="registered.password"
					@onInput="onInput($event,'registeredPassword')"
					@handleClear="handleClear('registeredPassword','clear')" />
				<my-input inputType="password" v-model="registered.confirmPassword"
					@onInput="onInput($event,'registeredConfirmPassword')"
					@handleClear="handleClear('registeredConfirmPassword','clear')" />

			</view>
			<view class="button-login" hover-class="button-hover">
				<text>注册</text>
			</view>
		</swiper-item>
	</swiper>
	<view class="cu-modal" v-if="isShowDialog" :class="modalName=='Modal'?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content">检查账号密码</view>
				<view class="action" @click="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="padding-xl">
				账号或密码输入不能为空！
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue'

	import {
		requestLogin,
		ILogin,
		getHome
	} from '../../../api/login/login'
	let isShowPas = ref(false)
	let isShowClear = ref(false)
	let modalName = 'Modal'
	let login = reactive({
		account: '',
		password: ''
	})
	let registered = reactive({
		account: '',
		password: '',
		confirmPassword: ''
	})

	let isShowDialog = ref(false)
	let swiperCurrentIndex = ref(0)
	const handleClick = (mode) => {
		mode == 'registered' ? swiperCurrentIndex.value = 1 : swiperCurrentIndex.value = 0
	}
	const hideModal = () => {
		isShowDialog.value = !isShowDialog.value
	}
	const handleRequestLogin = async () => {
		await getHome()
	}
	const handleLogin = (val, mode) => {
		if (!checkContent(val, mode)) {
			isShowDialog.value = !isShowDialog.value
		}
		handleRequestLogin()
		// uni.request({
		// 	url: 'https://www.wanandroid.com/user/login',
		// 	method: 'POST',
		// 	data: {
		// 		username: login.account,
		// 		password: login.password
		// 	},
		// 	success: res => {
		// 		console.log('res == ', res);
		// 	},
		// 	fail: () => {},
		// 	complete: () => {}
		// });
	}


	const handleRegistered = () => {}
	/**
	 * 检查账号密码是否为空
	 */
	const checkContent = (val, mode) => {
		return mode == 'input' ? val.account !== '' && val.account.length > 0 && val.password !== '' && val.password
			.length > 0 :
			val.account !== '' && val.account.length > 0 && val.password !== '' && val.password.length >
			0 && val.confirmPassword !== '' && val.password.confirmPassword > 0
	}

	const onInput = (val, ref) => {
		setContent(val, ref, 'input')
	}
	const handleClear = (ref, mode) => {
		setContent('', ref, mode)
	}
	const setContent = (val, ref, mode) => {
		switch (ref) {
			case 'loginAccount':
				mode == 'clear' ? login.account = '' : login.account = val
				break;
			case 'loginPassword':
				mode == 'clear' ? login.password = '' : login.password = val
				break;
			case 'registeredAccount':
				mode == 'clear' ? registered.account = '' : registered.account = val
				break;
			case 'registeredPassword':
				mode == 'clear' ? registered.password = '' : registered.password = val
				break;
			case 'registeredConfirmPassword':
				mode == 'clear' ? registered.confirmPassword = '' : registered.confirmPassword = val
				break;
		}
	}
</script>

<style scoped lang="scss">
	.bg {
		background-color: #409eff;
		height: 200px;
		width: 100%;
		display: flex;
		align-items: center;
	}

	.bg::after {
		content: '';
		border-top-left-radius: 100%;
		border-top-right-radius: 100%;
		position: absolute;
		width: 100%;
		top: 150px;
		background: #ffffff;
		height: 100px;
	}

	.logo {
		width: 100%;
		height: 150px;
	}

	.text {
		font-size: 100px;
		color: #409eff;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 140rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}

	.effect-1 {
		border: 0;
		padding: 7px 0;
		border-bottom: 1px solid #ccc;
	}

	.focus-border {
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 0;
		height: 1px;
		background-color: #2188F7;
		transition: 0.4s;
	}

	.effect-1:focus .focus-border {
		width: 100%;
		transition: 0.2s;
		transition-delay: 0.1s;
		left: 0;
	}


	.list-call .sl-input {

		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 34rpx;
		width: 470rpx;
		height: 100rpx;
		background: #409eff;
		border-radius: 50rpx;
		line-height: 100rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100rpx;
	}

	.button-hover {
		background: #5db4ff
	}

	.uni-icon {
		font-family: uniicons;
		font-size: 24px;
		font-weight: normal;
		font-style: normal;
		width: 24px;
		height: 24px;
		line-height: 24px;
		color: #999999;
	}

	.agreenment {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		margin-top: 30rpx;
		color: #409eff;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.agreenment text {
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>

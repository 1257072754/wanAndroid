<template>
	<image class="logo" src="../../static/images/logo.png" mode="aspectFit"></image>
	<view class="search-box" @click="onToSearch">
		<search placeholder='uni-app 自定义组件'></search>
	</view>
	<view class="tab-sticky">
		<tabs :tabsData="tabsData" :defaultIndex="currentTabIndex" @onTabClick="onTabClick" />
	</view>
	<swiper @transition="onSwiperTransttion" class="swiper" :current="currentTabIndex"
		:style="{height:+currentSwiperHeight+'px'}" @animationfinish="onSwiperAnimationFinish" @change="onSwiperChange">
		<swiper-item class="swiper-item" v-for="(tabItem,tabIndex) in tabsData" :key="tabIndex">
			<view>
				<uni-load-more status="loading" v-if="isLoading" />
				<block v-else>
					<hot-list-item v-for="(item,index) in (hotListData[currentTabIndex].data||[{a:a}])"
						:class="'hot-list-item-' + tabIndex" :key="index" :hotListData="item" :ranking="item.ranking"
						@onItemClick="onItemClick" />
				</block>
			</view>
		</swiper-item>
	</swiper>
</template>

<script setup>
	import {
		onMounted,
		onBeforeMount,
		ref,
		reactive,
		getCurrentInstance,
	} from 'vue'
	import {
		onPageScroll
	} from "@dcloudio/uni-app";
	import {
		getHotTabs,
		getHotLists,
		getHotListByType,

	} from '../../api/hot/hot.ts'

	let tabsData = ref([])
	let currentTabIndex = ref(0)
	let hotListData = ref([])
	let defaultIndex = ref(0)
	let isLoading = ref(false)
	let swiperHeightArr = ref({})
	let currentSwiperHeight = ref(0)
	let instance = getCurrentInstance()
	let currentScroll = 0
	let currentScroll1 = 130
	const getTabsList = async () => {
		tabsData.value = await getHotTabs()
	}
	getTabsList()
	const getHotList = async () => {
		isLoading.value = true
		hotListData.value[currentTabIndex.value] = (await getHotListByType(currentTabIndex.value)).list
		//console.log('数据 == ', hotListData.value);
		isLoading.value = false
		setTimeout(async () => {
			currentSwiperHeight.value = await getSwiperHeight()
			swiperHeightArr.value[currentTabIndex.value] = currentSwiperHeight.value
		}, 0)
	}
	onPageScroll((res) => {
		currentScroll = res
	})

	const onSwiperTransttion = (e) => {

		//判断缓存是否存在
		// if (!hotListData.value[currentTabIndex.value]) {
		// 	console.log('没有缓存 ==  ', hotListData.value);
		// 	return getHotList()
		// }

	}
	const onToSearch = () => {
		uni.navigateTo({
			url: '/subpkg/pages/search/search'
		})

	}
	const onSwiperAnimationFinish = () => {
		//判断缓存是否存在
		if (!hotListData.value[currentTabIndex.value]) {
			console.log('没有缓存 ==  ', hotListData.value);
			return getHotList()
		}
		//存在缓存
		console.log('有缓存 ==  ', hotListData.value);
		currentSwiperHeight.value = swiperHeightArr.value[currentTabIndex.value]
	}

	const onSwiperChange = (e) => {
		if (currentScroll.scrollTop > 130) {
			uni.pageScrollTo({
				scrollTop: 130,
				duration: 0
			})
		}
		currentTabIndex.value = e.detail.current
	}


	/**
	 * 计算swiper高度
	 */
	const getSwiperHeight = () => {
		return new Promise((resolve, reject) => {
			let sum = 0
			const query = uni.createSelectorQuery().in(instance)
			query.selectAll(`.hot-list-item-${currentTabIndex.value}`).boundingClientRect((res) => {
				res.forEach((item) => {
					sum += item.height
				})
				resolve(sum)
			}).exec()
		})
	}
	onMounted(() => {
		getHotList()
	})
	const navigateToPage = (src) => {
		uni.navigateTo({
			url: '/pages/webview/webview?src=' + src
		})
	}
	const onItemClick = (index) => {
		navigateToPage(index.link)
		// uni.navigateTo({
		// 	url: '/subpkg/pages/login/login'
		// })
	}
	const onTabClick = (index) => {
		currentTabIndex.value = index
		//判断缓存是否存在
		if (!hotListData.value[currentTabIndex.value]) {
			console.log('没有缓存 ==  ', hotListData.value);
			return getHotList()
		}
	}
</script>

<style scoped lang="scss">
	.logo {
		width: 100%;
		height: 80px;
	}

	.search-box {
		padding: 0 16px;
		margin-bottom: 8px;
	}

	.tab-sticky {
		position: -webkit-sticky;
		position: sticky;
		z-index: 99;
		/* #ifndef H5 */
		top: 0;
		/* #endif */
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
	}
</style>

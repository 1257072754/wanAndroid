<template>
	<div class="search-container">
		<view class="search-bar-box">
			<search :isShowInput="isShowInput" v-model="searchVal" @onSearchConfirm="onSearchConfirm"
				@onSearchFocus="onSearchFocus" @onSearchBlur="onSearchBlur" @onSearchClear="onSearchClear"
				@onSearchCancle="onSearchCancle" @onSearchInput="onSearchInput"></search>
		</view>
		<view class="search-hot-list-box" v-if="showType === HOT_LIST">
			<search-hot-list></search-hot-list>
		</view>
		<view class="search-history-box" v-else-if="showType === SEARCH_HISTORY">
			<search-history></search-history>
		</view>
		<view class="search-result-list-box" v-else-if="showType === SEARCH_RESULT">
			<search-result-list></search-result-list>
		</view>
	</div>

</template>

<script setup>
	import { ref, watchEffect } from 'vue'
	const HOT_LIST = '0'
	const SEARCH_HISTORY = '1'
	const SEARCH_RESULT = '2'
	let isShowInput = ref(true)
	let searchVal = ref('')
	let showType = ref(HOT_LIST)
	const onSearchConfirm = (val) => {
		if (searchVal) {
			setShowType(SEARCH_RESULT)
		}
		console.log('onSearchConfirm ==', val);
	}
	watchEffect(() => {
		console.log('ss == ', searchVal.value);
	})
	const onSearchFocus = (val) => { console.log('onSearchFocus', val); }
	const onSearchBlur = (val) => { console.log('onSearchBlur', val); }
	const onSearchClear = (val) => { console.log('onSearchClear', val); }
	const onSearchCancle = (val) => { console.log('onSearchCancle', val); }
	const onSearchInput = (val) => { console.log('onSearchInput', val); }
	const setShowType = (type) => {
		showType.value = type
	}
</script>

<style scoped lang="scss">
	.search-container {
		background-color: #fff;
		padding: 5px;
		position: sticky;
		top: 0px;
		z-index: 9;
	}
</style>

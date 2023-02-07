<template>
	<view class="search-container">
		<uni-search-bar v-if="props.isShowInput" class="search-bar" :radius="100" :placeholder="props.placeholder"
			:value="props.value" @confirm="onSearchConfirm" @focus="onSearchFocus" @blur="onSearchBlur"
			@clear="onSearchClear" @cancel="onSearchCancle" @input="onSearchInput">
			<uni-icons slot="clearIcon" type="clear" color="#999999" />
		</uni-search-bar>
		<view class="search-box" v-else>
			<image src="../../static/images/search.png" class="icon"></image>
			<text class="placeholder">{{props.placeholder}}</text>
		</view>
	</view>
</template>

<script setup>
	import { defineProps, defineEmits, ref, watchEffect } from 'vue'
	let text = ref('')
	const props = defineProps({
		value: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: '请输入搜索的内容'
		},
		isShowInput: {
			type: Boolean,
			default: false
		},
		config: {
			type: Object,
			default: () => ({
				height: 36,
				backgroundColor: '#ffffff',
				icon: '/static/images/search.png',
				textColor: '#454545',
				border: '1px solid #686868'
			})
		}
	})

	const emit = defineEmits(['onSearchConfirm', 'onSearchFocus', 'onSearchBlur', 'onSearchClear',
		'onSearchCancle', 'onSearchInput'
	])
	/**
	 * 回车搜索按钮触发
	 */
	const onSearchConfirm = (event) => {
		emit('onSearchConfirm', event)
	}
	/**
	 * 输入框获取焦点触发
	 */
	const onSearchFocus = (event) => {
		emit('onSearchFocus', event)
	}
	/**
	 * 输入框失去焦点触发
	 */
	const onSearchBlur = (event) => {
		emit('onSearchBlur', event)
	}
	/**
	 * 点击输入框中清除按钮触发
	 */
	const onSearchClear = (event) => {
		emit('onSearchClear', event)
	}
	/**
	 * 点击取消按钮触发
	 */
	const onSearchCancle = (event) => {
		emit('onSearchCancle', event)
	}
	/**
	 * value改变时触发
	 */
	const onSearchInput = (val) => {
		emit('onSearchInput', val)
	}
</script>

<style lang="scss" scoped>
	.search-container {
		display: flex;
		align-items: center;

		.search-bar {
			width: 100%;
		}

		.search-box {
			height: 36px;
			background-color: $uni-bg-color;
			border-radius: 15px;
			border: 1px solid #c9c9c9;
			width: 100%;
			display: flex;
			align-items: center;
			padding: 0 10px;

			.icon {
				width: 20px;
				height: 20px;
			}

			.placeholder {
				font-size: 12px;
				margin-left: 5px;
				color: #808080;
			}

		}
	}
</style>

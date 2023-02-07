<template>
	<view class="tab-container">
		<view class="tab-box">
			<scroll-view class="scroll-view" :scroll-left="scrollLeftIndex" scroll-x scroll-with-animation>
				<view class="scroll-content">
					<view class="tab-item-box">
						<block v-for="(item,index) in props.tabsData" :key="index">
							<view :id="'_tab_' + index" class="tab-item" @click="handleTabClick(index)"
								:class="{'tab-item-active':activeIndex === index}"
								:style="{color:activeIndex === index?defaultConfig.activeTextColor:defaultConfig.textColor}">
								{{item.label}}
							</view>
						</block>
					</view>
					<!-- 滑块 -->
					<view class="underLine" :style="{
						transform:'translateX('+slider.left+'px)',
						width:defaultConfig.underLineWidth+'px',
						height:defaultConfig.underLineHeight+'px',
						backgroundColor:defaultConfig.underLineColor
						}">
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineEmits,
		defineProps,
		reactive,
		ref,
		watchEffect,
		getCurrentInstance,
		onMounted
	} from "vue";
	//当前选中item
	let activeIndex = ref(0)
	let currentInstance = getCurrentInstance()
	//滑块
	let slider = reactive({
		//滑块距离左侧的距离
		left: 0
	})
	//scrollView的横向滚动条的位置
	let scrollLeftIndex = ref(0)
	//内部维护的TabsList数据对象,为每个item 单独维护一个silder的滑块对象
	let tabList = []
	//默认配置
	let defaultConfig = reactive({
		//默认字体颜色
		textColor: '#333333',
		//高亮字体颜色
		activeTextColor: '#f94d2a',
		//下划线的宽度
		underLineWidth: 24,
		//下划线的高度
		underLineHeight: 2,
		//下划线的颜色
		underLineColor: '#f94d2a'
	})
	//侦听器	
	watchEffect(() => {
		activeIndex.value = props.defaultIndex
		tabList = props.tabsData
		defaultConfig = { ...defaultConfig, ...props.config }
		if (tabList.length !== 0) {
			setTimeout(() => {
				updateTabWidth()
			}, 10)
		}
	})
	//更新tab的宽度
	const updateTabWidth = () => {
		//获取dom
		let query = uni.createSelectorQuery().in(currentInstance);
		tabList.forEach((item, index) => {
			query.select('#_tab_' + index).boundingClientRect(res => {
				item._slider = {
					left: res.left + (res.width - defaultConfig.underLineWidth) / 2
				}
				if (tabList.length - 1 === index) {
					tabToIndex()
				}
			}).exec()
		})
	}
	//发出的数据
	const emit = defineEmits(['onTabClick'])
	//接收的属性
	const props = defineProps({
		config: {
			type: Object,
			default: () => {
				return {}
			}
		},
		tabsData: {
			type: Array,
			default: () => {
				return []
			}
		},
		defaultIndex: {
			type: Number,
			default: 0
		}
	})
	//Tab Item点击
	const handleTabClick = (index) => {
		activeIndex.value = index
		tabToIndex()
		emit('onTabClick', index)
	}
	//根据当前的item位置，计算滑块滚动位置
	const tabToIndex = () => {
		slider.left = tabList[activeIndex.value]._slider.left
		scrollLeftIndex.value = activeIndex.value * defaultConfig.underLineWidth
	}
</script>

<style lang="scss" scoped>
	.tab-container {
		font-size: $uni-font-size-base;
		height: 45px;
		line-height: 45px;
		background-color: $uni-bg-color;

		.tab-box {
			width: 100%;
			height: 45px;
			display: flex;

			.scroll-view {
				white-space: nowrap;
				width: 100%;
				height: 100%;
				box-sizing: border-box;

				.scroll-content {
					width: 100%;
					height: 100%;
					position: relative;

					.tab-item-box {
						height: 100%;

						.tab-item {
							height: 100%;
							display: inline-block;
							text-align: center;
							padding: 0 15px;

							&-active {
								color: #F94d2b;
							}
						}
					}

					.underLine {
						height: 2px;
						width: 24px;
						background-color: #F94d2b;
						border-radius: 3px;
						transition: 0.5s;
						position: absolute;
						bottom: 0;
					}
				}
			}
		}
	}
</style>

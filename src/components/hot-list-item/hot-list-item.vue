<template>
	<view class="item-container" @click="onItemClick(props.hotListData)">
		<view class="item-box">
			<!-- 左侧 -->
			<view class="item-box-left">
				<!-- 排名 -->
				<hot-ranking :ranking="props.ranking"></hot-ranking>
			</view>
			<!-- 右侧 -->
			<view class="item-box-right">
				<!-- 标题 -->
				<view class="item-title line-clamp-2">
					{{props.hotListData.title}}
				</view>
				<!-- 简介 -->
				<view class="item-desc line-clamp-2">
					{{props.hotListData.desc}}
				</view>
				<view class="item-bottom-box">
					<!-- 作者 -->
					<text class="item-author">{{props.hotListData.author}}</text>
					<view class="hot-box">
						<!-- 小图标 -->
						<image class="hot-icon" src="/static/images/hot-icon.png" />
						<!-- 热度 -->
						<text class="hot-text">1000热度</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineEmits,
		defineProps,
	} from 'vue'
	//接受的数据
	const props = defineProps({
		hotListData: {
			type: Object,
			required: true
		},
		ranking: {
			type: Number,
			required: true
		}
	})
	//发出的数据
	const emit = defineEmits(['onItemClick'])
	const onItemClick = (index) => {
		emit("onItemClick", index)
	}
</script>

<style lang="scss" scoped>
	.item-container {
		padding-bottom: 12px;

		.item-box {
			display: flex;
			margin: 0px 10px;
			padding: 12px 10px;
			background-color: white;
			border-radius: 6px;
			box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);

			.item-box-left {
				margin-left: 5px;
			}

			.item-box-right {
				width: 100%;

				.item-title {
					font-size: 16px;
					font-weight: bold;
					color: #000;
				}

				.item-desc {
					padding-top: 4px;
					font-size: 14px;
					color: rgb(10, 9, 9);
				}

				.item-bottom-box {
					margin-top: 4px;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.item-author {
						font-size: 12px;
						color: #999;
					}

					.hot-box {
						.hot-icon {
							width: 20px;
							height: 20px;
							vertical-align: top;
						}

						.hot-text {
							margin-left: 5px;
							font-size: 12px;
							color: #f94d2a;
						}

					}
				}
			}
		}
	}
</style>

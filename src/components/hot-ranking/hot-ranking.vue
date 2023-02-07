<template>
	<view class="ranking-container">
		<image class="ranking-bg" :src="getRankingBg"></image>
		<text class="ranking-text" :class="{ 'text-white': ranking <= 3 }">{{props.ranking}}</text>
	</view>
</template>

<script setup>
	import {
		defineEmits,
		defineProps,
		computed
	} from 'vue'
	//接受的数据
	const props = defineProps({
		ranking: {
			type: Number,
			required: true,

		}
	})
	let getRankingBg = computed(() => {
		if (props.ranking <= 3) {
			const path = `../../static/images/ranking-${props.ranking}.png`;
			const modules =
				import.meta.globEager('../../static/images/*');
			return modules[path].default;
		}
		const path = '../../static/images/ranking-${props.ranking}.png';
		return path.default
	})
</script>

<style lang="scss" scoped>
	.ranking-container {
		position: relative;
		text-align: center;
		width: 18px;
		height: 20px;

		.ranking-bg {
			width: 100%;
			height: 100%;
		}

		.ranking-text {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-55%, -55%);
			font-size: 12px;
			font-weight: bold;
			color: #333;
		}
	}

	.text-white {
		color: #ffffff;
	}
</style>

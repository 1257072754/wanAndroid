<template>
	<view>
		<web-view :src="viewSrc"></web-view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	let viewSrc = ref('')

	onLoad((option) => {
		if (option) {
			console.log('option == ', option);
			viewSrc.value = option.src
		}
	})
</script>

<style lang="scss">

</style>

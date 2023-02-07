<template>
	<view class="list-call">
		<!-- 账号/密码类型图标 -->
		<uni-icons :type="props.inputType=='account'?'person':'locked-filled'" color="#409eff" size="30" />
		<!-- 输入框 -->
		<input class="sl-input" :value="props.modelValue" :type="props.inputType=='account'?'number':'text'"
			:maxlength="props.inputType=='account'?'11':'32'" :placeholder="props.inputType=='account'?'请输入账号':'请输入密码'"
			@input="onInput" :password="props.inputType=='account'?isShowPas:!isShowPas" />
		<!-- 清除图标 -->
		<uni-icons style="margin-left: 5rpx;" @click="handleClear" v-if="props.modelValue.length>0" type="close"
			color="#409eff" size="27" />
		<!-- 小眼睛图标 -->
		<uni-icons style="margin-left: 5rpx;" @click="handleShowPassword"
			v-if="defineInputType=='password'&&props.modelValue.length>0" :type="isShowPas ? 'eye' : 'eye-slash'"
			color="#409eff" size="30" />
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		defineProps,
		defineEmits,
		watchEffect
	} from 'vue'
	const emit = defineEmits(['handleClear', 'handleShowPassword', 'onInput', 'update:modelValue'])
	const props = defineProps({
		inputType: {
			type: String,
			default: 'account'
		},
		modelValue: {
			required: true,
			type: String
		},
		config: {
			type: Object,
			default: () => {
				return {}
			}
		},
	})
	let inputValue = ref('')
	let isShowPas = ref(false)
	let defineInputType = ref('')
	const handleClear = () => {
		inputValue.value = ''
		emit('handleClear')
	}
	const onInput = (val) => {
		emit('onInput', val.target.value)
	}
	const handleShowPassword = () => {
		isShowPas.value = !isShowPas.value
	}
	watchEffect(() => {
		defineInputType.value = props.inputType
	})
</script>

<style lang="scss">
	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 140rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}

	.list-call .sl-input {

		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}
</style>

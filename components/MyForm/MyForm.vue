<template>
	<view class="my_form_wrapper">
		<slot />
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: 'my-form',
		// 将自身传递出去 以便验证函数使用
		provide() {
			return {
				form: this
			}
		},
		mounted() {
			console.log('撒打算打算')
		},
		props: {
			model: { // 用户输入数据绑定
				type: Object,
				required: true
			},
			rules: { // 验证规则 通过provide传递给myFormItem组件
				type: Object
			}
		},
	}
</script>

<style>
	.my_form_wrapper {
		width: 100%;
		box-sizing: border-box;
		padding: 20upx;
	}
</style>

<template>
	<view :class="'my-form-item-wrapper'">
		<view :class="type === 'submit' ? '' : 'my-form-item' " @click="hanleClick">
			<view class="my-form-label" :for="prop" v-if="label">{{label}}</view>
			<slot></slot>
		</view>
		<text :aniation="animationData" v-if="loadingIcon && isLoading" class="iconfont icon-Loading1 checkLoading"></text>
		<transition :mode-class="['fade']" :show="errStatus" @change="change">
			<view  class="err-msg">{{errMsg}}</view>
		</transition>
	</view>
</template>

<script>
	// 导入验证方法
	import check from "../../libs/check"
	import transition from "../uni-transition/uni-transition"
	export default {
		name: "my-form-item",
		components: {
			transition
		},
		data() {
			return {
				errStatus: false, //错误状态
				errMsg: "", //错误提示文字
				isLoading: false, //loading状态
				timer: null, //定时器
				animationData: {}
			};
		},
		// 导出验证条件
		provide() {
			return {
				mode: this.form.rules[this.prop]
			};
		},
		// 接收myform的数据
		inject: ["form"],
		props: {
			prop: {
				type: String
			},
			label: { // 输入框前文字
				type: String,
				default: ""
			},
			loadingIcon: { // 是都显示检测loading图标
				type: Boolean,
				default: true
			},
			type: {
				type: String
			}
		},
		methods: {
			change() {
			        console.log('触发动画')
			    },
			// 验证函数
			validate(index) {
				this.errMsg = ''
				this.errStatus = false
				clearTimeout(this.timer)
				this.isLoading = true
				this.timer = setTimeout(() => { //这里只是一个模拟  感觉错误提示突然出现有点突兀
					this.form.rules[this.prop].forEach((ele, i) => {
						if (i === index) {
							// 调用检测函数得到结果
							let flog = check.checkInit(ele, this.form.model[this.prop])
							// 更新错误状态
							this.errStatus = !flog
							// 更新错误提示文字
							this.errMsg = this.form.rules[this.prop][index].message
							// 关闭loading图标
							this.isLoading = false
						}
					});
				}, 500)
			},
			checkAll() {
				let keys = Object.keys(this.form.rules)
				let flegArr = []
				keys.forEach((item) => {
					let tempRule = this.form.rules[item]
					tempRule.forEach((ite) => {
						let fleg = check.checkInit(ite, this.form.model[item])
						flegArr.push(fleg)
					})
				})
				console.log(flegArr);
				return flegArr.every((ele) => ele)
			},
			hanleClick() {
				// if (!this.type) return
				if (this.type !== 'submit') return
				let fleg = this.checkAll() 
				!fleg && uni.showToast({
					title: '请按规则输入!',
					duration: 2000,
					icon: 'none'
				});
				fleg && this.$emit('click-submit')
			}
		},
		mounted() {
			// console.log(this.form.rules[this.prop], '}}{{}{}{}{}{{[[[][][]]]}}}')
			this.$on("validate", this.validate)
		}
	}
</script>

<style scoped>
	.my-form-item-wrapper {
		position: relative;
		font-size: 40upx;
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 20upx 0 46upx;
	}

	.my-form-item-wrapper .my-form-item {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		border-bottom: 2upx solid #555555;
	}

	.my-form-item-wrapper .my-form-label {
		display: inline-block;
		padding-right: 15upx;
		font-size: 40upx;
		flex: 3;
		white-space: nowrap;
		overflow: hidden;
	}

	.my-form-item-wrapper .err-msg {
		box-sizing: border-box;
		position: absolute;
		padding-left: 80upx;
		padding-top: 10upx;
		font-size: 30upx;
		color: lightcoral;
		bottom: 2upx;
	}

	.my-form-item-wrapper .checkLoading {
		position: absolute;
		right: 20upx;
		color: darkcyan;
		font-size: 40upx;
		height: 50upx;
		width: 50upx;
		line-height: 50upx;
		text-align: center;
		margin-top: -25upx;
		top: 50%;
		animation: loading1 1s linear infinite;
	}

	@keyframes loading1 {
		0% {
			transform: rotateZ(0deg);
		}

		100% {
			transform: rotateZ(360deg);
		}
	}
</style>

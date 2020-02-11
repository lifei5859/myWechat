<template>
	<view class="my_input_wrapper">
		<input :password="type === 'password' ? true : false" :placeholder="placeholder" type="text" :style="{color: color, fontSize: fontSize ? fontSize + 'upx' : ''}"
		 value="" @input="handleInput" @blur="handleBlur" />
	</view>
</template>

<script>

	export default {
		name: 'myInput',
		// 接收myFormItem传递的数据
		data() {
			return {
				error: "",
				timer: 0,
				// modes: this.mode
			};
		},
		inject: ["form"],
		props: {
			placeholder: {
				type: String,
				default: ""
			},
			value: {
				type: String,
				default: ""
			},
			mId: {
				type: Number
			},
			type: {
				type: String,
				default: "text"
			},
			fontSize: {
				type: Number,
				default: 40
			},
			color: {
				type: String,
				default: '#464646'
			},
			prop: {
				type: String
			}
		},
		computed: {
			// rules() {
			// 	this.mode.forEach(ele => {
			// 		console.log(ele.mode, '{{}}}}{{[[[[]]]]}}');
			// 	});
			// 	return true;
			// }
		},
		methods: { 
			shake(fun, time) {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					fun();
				}, time);
			},
			handleInput(e) {
				let inputVal = e.target.value;
				this.$emit("input", inputVal);
			},
			// input后检测数据
			checkInput() {
				this.form.rules[this.prop].forEach((ele, index) => {
					ele.mode === "input" && this.$parent.$emit("validate", index);
				});
			},
			// blur后检测数据
			handleBlur() {
				this.form.rules[this.prop].forEach((ele, index) => {
					ele.mode === "blur" && this.$parent.$emit("validate", index);
				});
			}
		},
		watch: {
			value() {
				this.shake(this.checkInput, 500)
			}
		}
	}
</script>

<style scoped>
	.my_input_wrapper {
		position: relative;
		flex: 8; 
		display: flex;
		flex-direction: column;
	}

	.my_input_wrapper input {
		flex: 5;
		box-sizing: border-box;
		font-size: 40upx;
		padding: 0 10upx; 
	}
</style>

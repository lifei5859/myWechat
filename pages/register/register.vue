<template>
	<view class="reg_wrapper">
		<view class="reg_title">用户注册</view>
		<view class="reg_form_wrapper">
			<MyForm :model="model" :rules="rules">
				<MyFormItem label="昵称" prop="username">
					<MyInput placeholder="昵称如(不错欧)" prop="username" v-model="model.username"></MyInput>
				</MyFormItem>
				<MyFormItem label="邮箱" prop="mail">
					<MyInput placeholder="请输入邮箱" prop="mail" v-model="model.mail"></MyInput>
				</MyFormItem>
				<MyFormItem label="密码" prop="pass">
					<MyInput placeholder="请输入密码" prop="pass" type="password" v-model="model.pass"></MyInput>
				</MyFormItem>
				<MyFormItem prop="checkPass" label="确认密码">
					<MyInput placeholder="再次输入" prop="checkPass" type="password" v-model="model.checkPass"></MyInput>
				</MyFormItem>
				<MyFormItem type="submit" @click-submit="submit">
					<button type="primary">注册用户</button>
				</MyFormItem>
			</MyForm>
		</view>
	</view>
</template>

<script>
	import MyInput from '@/components/MyInput/MyInput.vue'
	import MyForm from '../../components/MyForm/MyForm.vue'
	import MyFormItem from '../../components/MyForm/MyFormItem.vue'
	export default {
		components: {
			MyInput,
			MyForm,
			MyFormItem
		},
		data() {
			return {
				model: {
					mail: '',
					pass: '',
					username: '',
					checkPass: ''
				},
				rules: {
					mail: [{
							reg: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
							mode: 'input',
							message: '请输入正确邮箱'
						},
						{
							required: true,
							message: '邮箱不能为空',
							mode: 'blur'
						},
					],
					username: [{
							required: true,
							message: '昵称不能为空',
							mode: 'blur'
						},
						{
							reg: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
							message: '昵称为2至12位中文,字母,数字',
							mode: 'input'
						}
					],
					pass: [{
							required: true,
							message: '密码不能为空',
							mode: 'blur'
						},
						{
							reg: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){6,20}$/,
							mode: 'input',
							message: '以字母开头,不能有._以外的符号6-20位'
						}
					],
					checkPass: [{
							required: true,
							message: '请再次输入密码',
							mode: 'blur'
						},
						{
							reg: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){6,20}$/,
							mode: 'input',
							message: '以字母开头,不能有._以外的符号6-20位'
						}
					]
				}
			}
		},
		props: {
			type: {
				type: String,
				default: 'default'
			},
			inverted: {
				type: Boolean,
				default: false
			},
			text: {
				type: [String, Number],
				default: ''
			},
			size: {
				type: String,
				default: 'normal'
			}
		},
		computed: {},
		methods: {
			async submit() {
				if (this.model.pass !== this.model.checkPass) {
					uni.showToast({
						title: '两次输入密码不一致',
						icon: 'none'
					})
					return
				}
				let res = await this.$post('/api/reg', this.model)
				let {data} = res
				if (data.status === 1) {
					uni.showToast({
						title: data.data.masg
					})
					uni.redirectTo({
						url: '../login/login'
					})
				} else {
					uni.showToast({
						title: data.data.msg,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style scoped>
	.reg_wrapper {
		width: 100%;
		height: 100%;
		position: relative;
		box-sizing: border-box;
	}

	.reg_wrapper .reg_title {
		font-size: 50upx;
		font-weight: bold;
		width: 100%;
		padding: 80upx 0;
		text-align: center;
	}

	.reg_wrapper .reg_form_wrapper {
		width: 100%;
		box-sizing: border-box;
		padding: 20upx 50upx;
	}
</style>

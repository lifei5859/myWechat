<template>
	<view class="wechat_login_wrapper">
		<view class="login_title">
			<text>
				用户登陆
			</text>
		</view>
		<view class="login_info">
			<MyForm :model="model" :rules="rules">
				<MyFormItem label="邮箱" prop="mail">
					<MyInput placeholder="请输入邮箱地址" prop="mail" v-model="model.mail"></MyInput>
				</MyFormItem>
				<MyFormItem prop="pass" label="密码">
					<MyInput placeholder="请输入密码" prop="pass" type="password" v-model="model.pass"></MyInput>
				</MyFormItem>
				<MyFormItem type="submit" @click-submit="submit">
					<button type="primary">登陆</button>
				</MyFormItem>
			</MyForm>
		</view>
		<!-- <view class="login_btn">
			<button type="primary" @click="submit">登陆</button>
		</view> -->
		<view class="reg_link_wrapper">
			<navigator url="../register/register" class="reg_link">
				| 注册账号 |
			</navigator>
		</view>
		<button @click="handleClick">ddddddddd</button>
	</view>
</template>

<script>
	import MyInput from '@/components/MyInput/MyInput.vue'
	import MyForm from '../../components/MyForm/MyForm.vue'
	import MyFormItem from '../../components/MyForm/MyFormItem.vue'
	export default {
		data() {
			return {
				model: {
					mail: '',
					pass: ''
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
					]
				}
			}
		},
		components: {
			MyInput,
			MyForm,
			MyFormItem
		},
		methods: {
			async handleClick() {
				console.log('真6')
				let res = await this.$get('/api/getUser');
				console.log(res)
			},
			// 登陆函数
			async submit() {
				let res = await this.$post(`/api/login`, this.model)
				let {data} = res
				if (data.status === 1) {
					console.log(data)
					uni.showToast({
						title: data.data.msg
					})
					uni.setStorageSync('jwt_token', `Bearer ${data.data.token}`);
					uni.setStorageSync('user', this.model.mail)
					uni.switchTab({
						url: '../index/index'
					})
				} else {
					
				}
				console.log(res, 'fasdfasdf=========>>>>>>>>>>>>>>>>>>')
			}
		}
	}
</script>

<style scoped>
	.wechat_login_wrapper {
		height: 100%;
		width: 100%;

	}

	.wechat_login_wrapper .login_title {
		padding: 100upx 0;
		text-align: center;
		font-weight: bold;
		font-size: 50upx;
	}

	.wechat_login_wrapper .login_info {
		padding: 50upx 50upx;
	}

	.wechat_login_wrapper .login_info .in_user {
		margin-bottom: 80upx;
	}

	.wechat_login_wrapper .login_btn {
		padding: 20upx 40upx;
	}

	.wechat_login_wrapper .reg_link_wrapper {
		width: 100%;
		position: absolute;
		text-align: center;
		bottom: 20upx;
	}

	.wechat_login_wrapper .reg_link_wrapper .reg_link {
		display: inline;
		color: #3F536E;
	}
</style>

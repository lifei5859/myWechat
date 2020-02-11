<template>
	<view class="wechat_me_wrapper" :style="{height: globalHeight + 'px'}">
		<view class="wechat_me_head" @click="setUser">
			<view class="wechat_me_details">
				<view class="me_name">{{user.data.userInfo['user_name']}}</view>
				<view class="me_mail">{{user.data.userInfo['e_mail']}}</view>
				<view class="me_what">还不知道写点啥</view>
			</view>
			<view class="wechat_me_icon_box">
				<image class="wechat_me_icon" :src="`${defaultUrl}${user.data.userInfo['user_head']}`" mode=""></image>
			</view>
		</view>
		<view class="user_options_wrapper">
			<uni-list class="user_options_box">
				<uni-list-item title="相册" :show-arrow="true"></uni-list-item>
				<uni-list-item title="收藏" :show-badge="true"></uni-list-item>
				<uni-list-item title="表情" :show-badge="true"></uni-list-item>
				<uni-list-item title="收藏" :show-badge="true"></uni-list-item>
			</uni-list>
		</view>
		<view class="user_options_wrapper">
			<uni-list class="user_options_box">
				<uni-list-item title="设置" :show-arrow="true"></uni-list-item>
			</uni-list>
		</view>
		<view class="cancel_btn">
			<button @click="handleClick">注销</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import UniList from "@/components/uni-list/uni-list.vue"
	import UniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		name: 'circle',
		data() {
			return {}
		},
		components: {
			UniList,
			UniListItem
		},
		computed: {
			...mapState(['user', 'defaultUrl', 'globalHeight'])
		},
		methods: {
			handleClick() {
				uni.removeStorageSync('jwt_token')
				uni.showToast({
					icon: 'none',
					position: 'top',
					title: '用户以注销'
				})
				uni.redirectTo({
					url: '../login/login'
				})
			},
			setUser() {
				uni.showModal({
					title: '提示',
					content: '修改用户资料？',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../setUser/setUser'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			show() {
				console.log(this.user)
			}
		},
		onReady() {}
	}
</script>

<style>
	.wechat_me_wrapper {
		height: 100%;
		width: 100%;
		background-color: #dcdcdc;
	}

	.wechat_me_wrapper .wechat_me_head {
		width: 100%;
		box-sizing: border-box;
		padding: 100upx 40upx;
		position: relative;
		display: flex;
		justify-content: space-between;
		/* background-color: #808080; */
	}

	.wechat_me_wrapper .wechat_me_head .wechat_me_icon_box {
		position: relative;
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
		border: 8upx solid #C8C7CC;
		overflow: hidden;
	}

	.wechat_me_wrapper .wechat_me_head .wechat_me_icon_box .wechat_me_icon {
		width: 100%;
		height: 100%;
	}

	.wechat_me_wrapper .wechat_me_head .wechat_me_details {
		color: #fff;
	}

	.wechat_me_wrapper .wechat_me_head .wechat_me_details .me_name {
		font-size: 44upx;
		padding: 10upx 5upx;
	}

	.wechat_me_wrapper .wechat_me_head .wechat_me_details .me_mail {
		font-size: 28upx;
		padding: 20upx 0;
	}

	.wechat_me_wrapper .user_options_wrapper {
		padding: 10upx 30upx;
		box-sizing: border-box;
		border-radius: 10upx;
		overflow: hidden;
	}

	.wechat_me_wrapper .user_options_wrapper .user_options_box {
		border-radius: 20upx;
	}

	.wechat_me_wrapper .cancel_btn {
		box-sizing: border-box;
		padding: 30upx;
	}
</style>

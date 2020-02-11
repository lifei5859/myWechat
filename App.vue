<script>
	import Vue from 'vue'
	Vue.prototype.defaultUrl = 'https://fg.easy.echosite.cn'
	Vue.prototype.$get = (url, data, header) => {
		const token = uni.getStorageSync('jwt_token')
		const user = uni.getStorageSync('user')

		return new Promise((res, rej) => {
			uni.request({
				method: 'GET',
				data,
				url: 'https://fg.easy.echosite.cn' + url,
				header: {
					...header,
					'Authorization': token ? token : '',
					'My-Mail': user ? user : ''
				},
				success: (data) => {
					// console.log(data)
					if (data.statusCode === 401) {
						uni.redirectTo({
							url: '/pages/login/login'
						})
					}
					if (data['header']['new-token']) {
						uni.setStorageSync('jwt_token', `Bearer ${data['header']['new-token']}`)
					}
					res(data)
				},
				fail(err) {
					console.log(err, '错误信息！！')
					rej(err)
				}
			})
		}).then((result) => {
			// console.log(result)
			return result
		}, (error) => {
			return result
		})
	}

	Vue.prototype.$post = (url, data, header) => {
		const token = uni.getStorageSync('jwt_token')
		const user = uni.getStorageSync('user')
		return new Promise((res, rej) => {
			uni.request({
				method: 'POST',
				data,
				url: 'https://fg.easy.echosite.cn' + url,
				header: {
					...header,
					'Authorization': token ? token : '',
					'My-Mail': user ? user : ''
				},
				success(data) {
					if (data.statusCode === 401) {
						uni.redirectTo({
							url: '/pages/login/login'
						})
					}
					if (data['header']['new-token']) {
						uni.setStorageSync('jwt_token', `Bearer ${data['header']['new-token']}`)
					}
					res(data)
				},
				fail(err) {
					console.log(err, '错误信息！！！')
					rej(err)
				}
			})
		}).then((result) => {
			return result
		}, (error) => {
			return result
		})
	}
	export default {
		onLaunch: function() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			console.log(windowHeight)
			this.$store.commit('getGlobalHeight', windowHeight)
		},
		onShow: function() {
			console.log('[[[show]]]')
			this.$store.dispatch('getUser')


		},
		onHide: function() {
			console.log('App Hide')

		}
	}
</script>

<style>
	/*每个页面公共css */
	page,
	#app {
		heihght: 100vh;
	}

	page {
		heihght: 100vh;
	}
</style>

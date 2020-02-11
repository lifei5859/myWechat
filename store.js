import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		defaultUrl: 'https://fg.easy.echosite.cn',
		globalHeight: 0,
		user: {}
	},
	mutations: {
		getUser(state, res) {
			state.user = res
		},
		getGlobalHeight(state, res) {
			state.globalHeight = res
		}
	},
	actions: {
		async getUser({commit}) {
			let res = await this._vm.$get('/api/user/getUserInfo');
			console.log('获取到了')
			if (res.statusCode === 200) {
				let {data} = res
				commit('getUser', data)
			} else {
				uni.showToast({
					title: '网路错误',
					icon: 'none',
					position: 'top'
				})
			}
		}
	}
})

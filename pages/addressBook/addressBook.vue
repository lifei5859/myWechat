<template>
	<view>
		<!-- <view> -->
			<uni-nav-bar background-color="#fdfdfd" title="通讯录" right-icon="plus" @clickRight="handleRight"></uni-nav-bar>
		<!-- </view> -->
		<uni-search-bar @confirm="search" @input="input" ></uni-search-bar>
		{{name}}
	</view>
</template>

<script>
	import UniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import UniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				title: 'circle',
				name: '圈子'
			}
		},
		components: {
			UniNavBar,
			UniSearchBar
		},
		methods: {
			handleClick() {
				console.log(8888)
			},
			clickText(data) {
				console.log(data)
			},
			handleRight() {
				console.log('搜索了')
			}
		},
		computed: {
			...mapState(['user'])
		},
		onLoad() {
			this.clickText({
				name: '444',
				age: 'oo'
			})
		},
		onShow() {
			console.log(this.user)
		}
	}
</script>

<style>

</style>

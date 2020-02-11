<template>
  <view class="content">
    <uni-nav-bar
      background-color="#fdfdfd"
      title="消息"
      right-icon="search"
      @clickRight="handleRight"
    ></uni-nav-bar>
    <uni-list class="user_options_box">
      <uni-list-item 
	  class="user_item" 
	  user 
	  :show-arrow="false" 
	  :badge-text="2" 
	  show-badge 
	  note="asdsfadsfasdfasdfaasda" 
	  title="相册" 
	  thumb="https://fg.easy.echosite.cn/defaultImg/defaultHead.jpg">
	  </uni-list-item>
	   <uni-list-item 
	  class="user_item" 
	  user 
	  :show-arrow="false" 
	  :badge-text="1" 
	  show-badge 
	  msg-time="上午9:25"
	  title="相册" 
	  thumb="https://fg.easy.echosite.cn/defaultImg/defaultHead.jpg">
	  </uni-list-item>
    </uni-list>
  </view>
</template>

<script>
import UniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import UniListItem from "@/components/uni-list-item/uni-list-item.vue";
import UniList from "@/components/uni-list/uni-list.vue";

export default {
  data() {
    return {};
  },
  components: {
	UniNavBar,
	UniListItem,
	UniList

  },
  onShow() {
    const token = uni.getStorageSync("jwt_token");
    if (!token) {
      uni.navigateTo({
        url: "../login/login"
      });
    }
  },
  methods: {}
};
</script>

<style>
.user_item {
	background: #f9f9f3;
}
</style>

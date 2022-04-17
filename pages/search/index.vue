<template>
	<view class="">
		<u-navbar title="" :back-icon-size='28' back-icon-color="#696969" :height="50" :background="{background:'#FFF0F5'}">
			<view class="slot-wrap">
				<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
				<u-search v-model="keyword" height="60" :animation="true" placeholder="搜索商品" bg-color="#fff" border-color="#FF8888" :action-style="actionStyle" focus @custom="search" @search="search"></u-search>
			</view>
		</u-navbar>
		<view class="header">
			<view class="title">历史搜索</view>
			<view class="delete">
				<u-icon name="trash"  size="30" color="#888" @click="cleanHistory"></u-icon>
			</view>
		</view>
		<view class="sui-tag">
			<u-tag type="info" shape="circle" border-color="#F5F5F5" bg-color="#F5F5F5" :text="item" class="item" v-for="(item, index) in historys" :key="index" @click="search(item)"></u-tag>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:'',
				historyList:[],
				actionStyle: {
					width:"100rpx",
					height:"50rpx",
					backgroundColor:"#FF8888",
					borderRadius:"40rpx",
					color:"#fff",
					textAlign:"center",
					lineHeight:"50rpx"
				}
			}
		},
		computed: {	
			//将最新的搜索记录添加到数组开头
			  historys() {
				return [...this.historyList].reverse()
			  }
},
		methods: {
			// 搜索
			search(keyword) {
				// console.log(keyword)
				this.keyword = keyword;
				if(keyword) {
					// 跳转到搜索商品列表
					const params = {keyword}
					this.$u.route({
						url:'pages/search/list',
						params
					})
					this.saveSearchHistory()
				}
			},
			//保存搜索历史并持久化
			 saveSearchHistory() {
			   const set = new Set(this.historyList)
				 set.delete(this.keyword)
				 set.add(this.keyword)
				 this.historyList = Array.from(set)
				 uni.setStorageSync('keywords', JSON.stringify(this.historyList))
			 },
			cleanHistory() {
				this.historyList = []
				uni.setStorageSync('keywords', '[]')
			},
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('keywords') || '[]')
		}
	}
</script>

<style lang="scss" scoped>
	// page{
	// 	background-color: #F5F5F5;
	// }
	.slot-wrap {
		margin-right: 20rpx;
		width:100%;
	}
	.header {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 20rpx 0;
		.title {
			// width: 100%;
			// background-color: #fff;
			// border-radius: 20rpx 20rpx 0 0;
			
			font-size: 32rpx;
			font-weight: bold;
		}
		.delete {
			margin-top: 4rpx;
		}
	}
	
	.sui-tag {
		padding: 20rpx;
		display: flex;
		flex-wrap: wrap;
		.item {
			margin-right: 20rpx;
			margin-bottom: 20rpx;
		}
		// .item {
		// 	display: flex;
		// 	// width: 160rpx;
		// 	height: 50rpx;
		// 	background-color: #F5F5F5;
		// 	text-align: center;
		// 	line-height: 50rpx;
		// 	// padding: 2rpx;
		// 	border-radius: 20rpx;
			
		// }
	}
</style>

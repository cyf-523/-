<template>
	<!-- <view class="search">
		<u-search   disabled placeholder="搜索商品" :show-action="false"></u-search>
	</view> -->
	<view class="">
		<view class="u-search-box">
			<view class="u-search-inner" @click="goSearch">
				<u-icon name="search" color="#909399" :size="28"></u-icon>
				<text class="u-search-text">搜索商品</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Search",
		methods: {
			// 去搜索页
			goSearch() {
				this.$u.route({
					url: 'pages/search/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-search-box {
		padding: 18rpx 30rpx;
		position: fixed;
		top: 88rpx;
		z-index: 1;
		width: 100%;
		height: 100rpx;
		// border: 1px solid black;
		background-color: #fff;
		.u-search-inner {
			background-color: #F5F5F5;
			border-radius: 100rpx;
			display: flex;
			align-items: center;
			padding: 10rpx 16rpx;
			border: 4rpx solid #FF8888;
			.u-search-text {
				font-size: 26rpx;
				color: $u-tips-color;
				margin-left: 10rpx;
			}
		}
	}
</style>

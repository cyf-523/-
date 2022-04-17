<template>
	<navigator :url="`../../pages/goods/detail?id=${good.skuInfo.id}`" class="goods-item">
		<image class="u-skeleton-fillet" :src="good.skuInfo.cover_url"></image>
		<view class="titles">
			<view class="hot u-skeleton-rect" v-if="good.skuInfo.hot">HOT</view>
			<view class="title u-line-1 u-skeleton-rect" >{{good.skuInfo.title ? good.skuInfo.title : '商品名称'}}</view>
		</view>
		<view class="sale">
			<view class="price u-skeleton-rect">￥{{good.skuInfo.price}}</view>
			<view class="sales u-skeleton-rect u-line-1" v-show="good.skuInfo.sales <= 2000">{{good.skuInfo.sales}}人付款</view>
			<view class="sales u-skeleton-rect u-line-1" v-show="good.skuInfo.sales > 2000">2000+人付款</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		name:"goods",
		props: {
			good: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.goods-item {
	background-color: #fff;
	border-radius: 10rpx;
	margin: 4rpx 4rpx;
	image {
		// width: 300rpx;
		border-radius: 10rpx;
		width: 100%;
		height: 360rpx;
	}
	.titles {
		display: flex;
		margin: 10rpx;
		.hot {
			width: 80rpx;
			height: 40rpx;
			text-align: center;
			line-height: 40rpx;
			border-radius: 8rpx;
			background-color: #F29100;
			color: #fff;
			padding: 0 4rpx 0;
		}
		.title {
			// font-weight: bold;
			margin-left: 10rpx;
			font-size: 32rpx;
			width: 100%;
		}
	}
	.sale {
		display: flex;
		justify-content: space-between;
		margin: 10rpx 0 20rpx 10rpx;
		padding: 0 10rpx 10rpx 0;
		.price {
			color: #FF4500;
			font-size: 34rpx;
			// width: 40%;
			width: 140rpx;
		}
		.sales {
			color: #888;
			font-size: 26rpx;
			margin-top: 6rpx;
			// width: 180rpx;
			// width: 50%;
		}
	}
	
}
</style>

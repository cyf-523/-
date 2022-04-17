<template>
	<view class="centre">
		<u-icon class="icon" name="checkmark-circle-fill" color="#FF8888" size="100"></u-icon>
		<view class="explain">
			支付成功！
			<view class="tips">去看看还有哪些想买的</view>
		</view>
		<view class="btn">随便逛逛</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			// console.log(option)
		}
	}
</script>

<style lang="scss" scoped>
	.centre {
		text-align: center;
		margin: 100rpx auto;
		font-size: 32rpx;
		.icon {
			margin-bottom: 20rpx;
		}
		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}
		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}
</style>

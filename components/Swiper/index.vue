<template>
	<view class="wrap">
		<u-swiper :list="list" :height="300"></u-swiper>
	</view>
</template>

<script>
	export default {
		name:"Swiper",
		props: ['list']
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 4rpx 20rpx 20rpx;
		// clear: both;
		margin-top: 100rpx;
	}
</style>

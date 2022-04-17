<template>
	<view class="">
		<view class="order">
			<view class="product" v-for="(product, index) in orderDetail.goodsList" :key="index">
				<view class="left">
					<image :src="product.cover_url" mode=""></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="title u-line-1">{{product.title}}</view>
						<view class="price">￥{{product.price}}</view>
					</view>
					<view class="info">
						<view class="attr u-line-2" v-if="product.size">{{product.color}};{{product.size}}</view>
						<view class="attr u-line-2" v-else>{{product.color}}</view>
						<view class="num">×{{product.skuNum}}</view>
					</view>
				</view>
			</view>
			<view class="total">
				<view class="relpay">实付款</view>
				<view class="totalPrice">￥{{orderDetail.orderTotal}}</view>
			</view>
			<view class="addressInfo">
				<view class="msg">收货信息：</view>
				<view class="address">{{orderDetail.addressInfo.name}},{{orderDetail.addressInfo.phone}},{{orderDetail.addressInfo.area}} {{orderDetail.addressInfo.address}}</view>
			</view>
			<view class="orderInfo">
				<view class="orderId">订单编号：</view>
				<view class="id">{{orderDetail.orderId}}</view>
			</view>
			<view class="orderInfo">
				<view class="orderId">创建时间：</view>
				<view class="id">{{createDate}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				orderId:'',
			}
		},
		computed: {
			...mapState({
				orderDetail: state => state.order.orderDetail
			}),
			createDate() {
				return new Date(1649862488459)
			}
		},
		methods: {
			// 获取订单详情
			async getOrderDetail() {
				await this.$store.dispatch('getOrderDetail', {orderId:this.orderId})
			}
		},
		onLoad(option) {
			this.orderId = option.orderId;
			this.getOrderDetail()
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
	}
	.order {
		margin: 20rpx 10rpx;
		background-color: #FFFFFF;
		// height: 280rpx;
		border-radius: 20rpx;
		padding: 20rpx;
		.product {
			margin-bottom: 10rpx;
			display: flex;
			.left {
				image {
					border-radius: 20rpx;
					width: 160rpx;
					height: 160rpx;
				}
			}
			.right {
				margin-left: 20rpx;
				.top {
					display: flex;
					font-weight: bold;
					margin-bottom: 20rpx;
					.title {
						font-size: 30rpx;
						width: 430rpx;
					}
				}
				.info {
					display: flex;
					color: #888;
					.attr {
						width: 470rpx;
					}
				}
			}
		}
		.total {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10rpx;
			.totalPrice {
				font-size: 32rpx;
				font-weight: bold;
				color: #FF4500;
			}
		}
		.addressInfo {
			display: flex;
			color: #888;
			margin-bottom: 10rpx;
			.msg {
				color: black;
				width: 300rpx;
			}
		}
		.orderInfo {
			display: flex;
			justify-content: space-between;
			color: #888;
			margin-bottom:10rpx;
			.orderId {
				color: black;
			}
		}
	}
</style>

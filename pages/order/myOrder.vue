<template>
	<view class="">
		<u-tabs class="tabs" :list="list" :is-scroll="false" :current="current" @change="change" active-color="#FF8888"></u-tabs>
		<view class="container" v-for="(order, index) in this.orderList" :key="order.orderList._id" >
			<view class="order" v-for="(product, index) in order.orderList.goodsList" :key="index" @click="toOrderDetail(order.orderList.orderId)">
				<view class="product">
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
				
			</view>
			<view class="bottom">
				<view class="wuliu btn" v-show="order.orderList.orderStatus == '1'">付款</view>
				<view class="wuliu btn" v-show="order.orderList.orderStatus == '2'" @click="remind(order.orderList.orderId)">提醒发货</view>
				<view class="wuliu btn" v-show="order.orderList.orderStatus == '3'">收货</view>
				<view class="wuliu btn" v-show="order.orderList.orderStatus == '3'">查看物流</view>
				<view class="comment btn" v-show="order.orderList.orderStatus == '4'">评价</view>
				<view class="delete btn" v-show="order.orderList.orderStatus == '4'">删除订单</view>
			</view>
		</view>
		<view class="centre" v-show="this.orderList.length == 0">
			<u-icon class="icon" name="file-text-fill" color="#FF8888" size="100"></u-icon>
			<view class="explain">
				您还没有相关的订单
				<view class="tips">可以去看看有哪些想买的</view>
			</view>
			<view class="btn">随便逛逛</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
			data() {
				return {
					list: [
						{name: '全部'},
						{name: '待付款'},
						{name: '待发货'},
						{name: '待收货'}, 
						{name: '待评价'},
					],
					current: 0,
					params:{}
				}
			},
			computed: {
				...mapState({
					orderList: state => state.order.orderList
				})
			},
			methods: {
				change(index) {
					this.current = index;
					this.getOrderList()
				},
				// 获取订单
				async getOrderList() {
					// 增加分类条件
					this.params.current = this.current;
					await this.$store.dispatch('getOrderList',this.params)
				},
				// 去订单详情页
				toOrderDetail(orderId) {
					this.$u.route({
						url:'pages/order/orderDetail',
						params:{orderId}
					})
				},
				// 提醒卖家发货
				remind(orderId) {
					this.$refs.uToast.show({title: '已提醒商家发货'})
					// 发请求通知商家发货
					setTimeout(() => {
						this.$u.api.reqRemind({orderId})
					}, 5000)
				}
			},
			onLoad(option) {
				this.current = parseInt(option.current)
				this.getOrderList()
				// 关闭未付款订单
				// console.log(this.orderList)
				
				this.orderList.forEach(item => {
					if(item.orderList.orderStatus == '1') {
						let timestamp = uni.getStorageSync(item.orderList.orderId+'time');
						console.log(timestamp)
						let time = (new Date()).getTime() - timestamp;
						console.log(time)
						// setTimeout(() => {
						// 	uni.removeStorageSync(item.orderList.orderId)
						// },)
						
					}
					console.log(item.orderList.orderStatus)
				})
			}
		}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
		padding-top: 80rpx;
	}
	.tabs {
		width: 100%;
		position: fixed;
		top: 88rpx;
		z-index: 1;
	}
	.container {
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
		
	}
	.bottom {
		margin-top: 10rpx;
		// margin-left: 210rpx;
		// margin-right: 20rpx;
		display: flex;
		flex-direction: row-reverse;
		.btn {
			height: 50rpx;
			width: 140rpx;
			text-align: center;
			line-height: 50rpx;
			border: 1px solid #888;
			border-radius: 30rpx;
			margin-left: 20rpx;
		}
	}
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

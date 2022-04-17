<template>
	<view class="">
		<view class="address" @click="toMyAddress" v-if="address">
			<view class="left">
				<u-icon name="map-fill" color="orange" size="48"></u-icon>
			</view>
			<view class="right">
				<view class="title">{{address.address}}</view>
				<view class="info">
					<view class="name">{{address.name}}</view>
					<view class="phone">{{address.phone}}</view>
					<view class="enter"></view>
				</view>
			</view>
		</view>
		<view class="address" @click="toMyAddress" v-else>
			<view class="left">
				<u-icon name="map-fill" color="orange" size="48"></u-icon>
			</view>
			<view class="right">
				<view class="title">添加收货地址</view>
			</view>
		</view>
		<view class="order" v-for="(product,index) in preViewOrderList" :key="index">
			<view class="product">
				<image :src="product.cover_url" mode=""></image>
				<view class="right">
					<view class="top">
						<view class="title u-line-1">{{product.title}}</view>
						<view class="price">￥{{product.price}}</view>
					</view>
					<view class="bottom">
						<view class="attr u-line-2" v-if="product.color&&product.size">主要颜色:{{product.color}} ; 尺码:{{product.size}}</view>
						<view class="attr u-line-2" v-else>{{product.color}}</view>
						<view class="num">×{{product.skuNum}}</view>
					</view>
				</view>
			</view>
			<view class="send">
				<view class="title">配送服务</view>
				<view class="intro">快递 免费</view>
			</view>
		</view>
		<view class="footer">
			<view class="btn" @click="pay">提交订单</view>
			<view class="totalPrice ">￥{{totalPrice}}</view>
			<text>合计:</text>
			<view class="totalNum">共{{totalNum}}件</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				// idArr:'',
				addressId:'',
				totalPrice:0
			}
		},
		computed: {
			...mapState({
				addressList: state => state.order.addressList,
				productList: state => state.shopcart.cartList
			}),
			address() {
				if(!this.addressId) {
					if(this.addressList.find(item => item.isDefault == true)) {
						return this.addressList.find(item => item.isDefault == true)
					}else {
						return this.addressList[0]
					}
					
				}else {
					return this.addressList.find(item => item.id == this.addressId)
				}
			},
			preViewOrderList() {
				return this.productList.filter(item => item.isChecked == '1')
			},
			totalNum() {
				return this.preViewOrderList.reduce((res, item) => {
					return res + item.skuNum
				},0)
			}
		},
		methods: {
			// 获取购物车数据
			async getCartList() {
				await this.$store.dispatch('getCartList');
			},
			// 获取用户地址
			async getAddress() {
				try{
					await this.$store.dispatch('getAddress')
				}catch(e){
					this.$u.toast(e)
				}
			},
			// 去我的收货地址
			toMyAddress() {
				this.$u.route({
					url:'pages/order/address'
				})
			},
			// 支付
			async pay() {
				const params = {
					orderId:Date.now(),
					totalPrice:this.totalPrice,
					orderName:'订单名称',
					skuInfo:JSON.stringify(this.preViewOrderList),
					addressInfo:JSON.stringify(this.address)
				}
				
				let result = await this.$u.api.reqPay(params);
				if(result.code == 200) {
					// 将支付地址存到本地存储中
					uni.setStorageSync(`${result.orderId}`, result.result)
					uni.setStorageSync(`${result.orderId}time`, result.timestamp)
					// 跳转到支付界面
					// window.location.href = result.result
					window.open(result.result, '_blank')
					setTimeout(() => {
						this.$u.route({
							url:'pages/center/index',
							type:'switchTab'
						})
					},1500)
					
				}
			}
		},
		onShow() {
			this.addressId = uni.getStorageSync('ADDRESSID');
			// console.log(this.addressId)
		},
		onLoad(option) {
			this.totalPrice = option.totalPrice;
			// this.preViewOrder();
			this.getCartList()
			this.getAddress()
			
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
	}
	.address {
		background-color: #FFFFFF;
		height: 120rpx;
		margin: 20rpx 10rpx;
		border-radius: 14rpx;
		padding: 10rpx 20rpx;
		display: flex;
		align-items: center;
		.right {
			margin-left: 20rpx;
			.title {
				font-size: 32rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
			}
			.info {
				display: flex;
				align-items: center;
				color: #888;
				.name {
					margin-right: 10rpx;
					font-size: 30rpx;
				}
			}
			.enter {
				margin-left: 332rpx;
				// margin-right: 10rpx;
				margin-top: -80rpx;
				position: relative;
				&:after,
				&:before {
					content: '';
					position: absolute;
					width: 0;
					height: 0;
					font-size: 0;
					border: 12rpx solid transparent;
					border-left-color: #888;
				}
				&:after {
					border-left-color: #fff;
					left: -2rpx;
				}
			}
		}
		
	}
	.order {
		height: 260rpx;
		background-color: #FFFFFF;
		margin: 0 10rpx 20rpx;
		border-radius: 14rpx;
		padding: 20rpx;
		.product {
			display: flex;
			// align-items: center;
			image {
				height: 160rpx;
				width: 160rpx;
				border-radius: 20rpx;
			}
			.right {
				margin-left: 20rpx;
				.top {
					display: flex;
					margin-bottom: 10rpx;
					// justify-content: space-between;
					.title {
						font-size: 30rpx;
						width: 420rpx;
					}
					.price {
						font-weight: bold;
					}
				}
				.bottom {
					display: flex;
					color: #888;
					.attr {
						width: 420rpx;
					}
					.num {
						margin-left: 40rpx;
					}
				}
			}
		}
		.send {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
		}
	}
	.footer {
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		flex-direction: row-reverse;
		.totalNum {
			font-size: 26rpx;
			color: #888;
		
		}
		text {
			font-weight: bold;
			margin-left: 10rpx;
		}
		.totalPrice {
			color: #FF4500;
			font-size: 36rpx;
			font-weight: bold;
			margin-right: 10rpx;
		}
		.btn {
			background-image: linear-gradient(to right,#FF7F50,	#FF4500);
			width: 200rpx;
			line-height: 66rpx;
			height: 66rpx;
			text-align: center;
			border-radius: 18px;
			color: #ffffff;
			margin-right: 10rpx;
		}
	}
	
</style>

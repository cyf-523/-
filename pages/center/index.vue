<template>
	<view>
		<view class="header" >
			<view class="avatar-body">
				<u-avatar :src="'http://192.168.79.1:3000'+url" size="140"></u-avatar>
			</view>
			<view class="name">
				<view class="nickname">{{nickname}}</view>
				<text class="fans">关注0 | 粉丝0</text>
			</view>
			<!-- <view class="shezhi">
				<image src="/static/shezhi.png"></image>
			</view> -->
		</view>
		<view class="myOrder">
			<view class="title" @click="toMyOrder(0)">
				<text class="order">我的订单</text>
				<view class="total">
					<text>全部</text>
					<view class="enter"></view>
				</view>
			</view>
			<view class="content">
				<view class="item" @click="toMyOrder(1)">
					<image src="../../static/pay.png"></image>
					<text>代付款</text>
				</view>
				<view class="item" @click="toMyOrder(2)">
					<image src="../../static/send.png"></image>
					<text>代发货</text>
				</view>
				<view class="item" @click="toMyOrder(3)">
					<image src="../../static/receive.png"></image>
					<text>代收货</text>
				</view>
				<view class="item" @click="toMyOrder(4)">
					<image src="../../static/comment.png"></image>
					<text>代评价</text>
				</view>
				
			</view>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="账号与安全" @click="toBaseInfo"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="我的收藏" @click="toMycollect"></u-cell-item>
				<u-cell-item icon="map" title="我的收获地址" @click="toMyAddress"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="logout" @click="logout">退出登录</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		// data() {
		// 	return {
		// 		// pic:'https://uviewui.com/common/logo.png',
		// 		show:true,
		// 		isAndroid: false
		// 	}
		// },
		computed: {
			...mapState({
				nickname: state => state.user.userInfo.nickname,
				url: state => state.user.userInfo.url,
			})
		},
		onLoad() {
			if(!this.$u.utils.isLogin()) return
			this.getUserInfo()
		},
		 methods: {
			 // 获取用户信息
			 async getUserInfo() {
				 try{
				 	// 派发action，获取用户信息
				 	await this.$store.dispatch('getUserInfo');
					// 获取用户信息成功
				 }catch(e){
					 // 失败
				 	this.$u.toast(e)
					// 重定向到登录
					setTimeout(() => {
						this.$u.route({
							type: 'redirect',
							url: 'pages/auth/login',
						})
					}, 1500)
				 }
			 },
			// 我的订单
			toMyOrder(current) {
				this.$u.route({
					url:'pages/order/myOrder',
					params:{current}
				})
			},
			// 修改个人信息
			toBaseInfo() {
				this.$u.route({
					url: 'pages/center/baseInfo'
				})
			},
			// 我的收藏
			toMycollect() {
				this.$u.route({
					url: 'pages/center/mycollect'
				})
			},
			// 我的收货地址
			toMyAddress() {
				this.$u.route({
					url: 'pages/order/address'
				})
			},
			// 退出登录
			logout() {
				this.$store.commit('DELETETOKEN');
				this.$u.toast('退出成功')		
				setTimeout(() => {
					// 跳转到首页
					this.$u.route({
						type: 'reLaunch',
						url: 'pages/index/index'
					})
				}, 1000)
			}
		 }
	}
</script>

<style lang="scss">
page {
	background-image: linear-gradient(pink, #fff, #F5F5F5, #F5F5F5, #F5F5F5, #F5F5F5,#F5F5F5);
}
.header {
	padding: 40rpx;
	display: flex;
	// align-items: center;
	.avatar-body {
		width: 70px;
		height: 70px;
	}
	.name {
		display: flex;
		flex-wrap: wrap;
		margin-top: 8rpx;
		margin-left: 20rpx;
		width: 220rpx;
		.nickname {
			font-size: 32rpx;
			font-weight: bold;
		}
	}
	// .shezhi {
	// 	// flex: 2;
	// 	margin-left: 200rpx;
	// 	margin-top: 10rpx;
	// 	image {
	// 		width: 60rpx;
	// 		height: 60rpx;
			
	// 	}
	// }
	
}
.myOrder {
	background-color: #FFFFFF;
	height: 220rpx;
	// border: 1px solid black;
	box-shadow: 10rpx 10rpx 10rpx rgba(0,0,0,0.1);
	border-radius: 20rpx;
	margin: 10rpx;
	padding: 20rpx;
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.order {
			font-size: 32rpx;
			font-weight: bold;
		}
		.total {
			display: flex;
			color: #888;
			.enter {
				margin-left: 10rpx;
				margin-right: 10rpx;
				margin-top: 8rpx;
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
	.content {
		display: flex;
		margin: 30rpx 50rpx;
		justify-content: space-between;
		.item {
			width: 100rpx;
			display: flex;
			flex-wrap: wrap;
			image {
				width: 64rpx;
				height: 64rpx;
				margin-left: 10rpx;
			}
		}
		
	}
}
.logout {
	margin: 20rpx 10rpx;
	text-align: center;
	line-height: 100rpx;
	height: 100rpx;
	border-radius: 10rpx;
	color: #fff;
	font-weight: bold;
	font-size: 32rpx;
	// background-image: linear-gradient(pink, #fff);
	background-color: 	#FFE4E1;
}
</style>

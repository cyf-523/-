<template>
	<view>
		<view class="cartList">
			<u-swipe-action
				:btn-width="100"
				:show="cart.show" 
				:index="cart._id"
				v-for="(cart, index) in cartList" 
				:key="cart._id" 
				@click="click" 
				@open="open"
				
				:options="options"
			>
				<view class="item u-border-bottom">
					<view class="left">
						<u-checkbox shape="circle" size="40" active-color="#FF8888" v-model="cart.isChecked" :name="cart._id" @change="changeCheck"></u-checkbox>
					</view>
					<image mode="aspectFit" :src="cart.cover_url" @click="toDetail(cart.id)" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="right">
						<view class="title-wrap" @click="toDetail(cart.id)">
							<text class="title u-line-2">{{ cart.title }}</text>
						</view>
						<view class="attr u-line-1" @click="toDetail(cart.id)" v-if="cart.color&&cart.size">{{cart.color}} ; {{cart.size}}</view>
						<view class="attr u-line-1" @click="toDetail(cart.id)" v-else>{{cart.color}}</view>
						<view class="skuNum">
							<view class="price" @click="toDetail(cart.id)">￥{{cart.price}}</view>
							<view class="num">
								<u-number-box :index='cart._id' v-model="cart.skuNum" @minus="changeSkuNum" @plus="changeSkuNum" @blur="changeSkuNum" :min="1"></u-number-box>
							</view>
						</view>	
					</view>
				</view>
			</u-swipe-action>
		</view>
		<view class="footer">
			<view class="u-p-l-20 u-p-r-40 u-flex-5">
				<u-checkbox size="40" shape="circle" active-color="#FF8888" v-model="isAllCheck" @change="isAllChecked(isAllCheck)">全选</u-checkbox>
			</view>
			<view class="u-flex u-flex-7 u-row-around">
				<view>
					<text class="title">合计:</text>
					<text class="price" v-show="!totalPrice">￥0</text>
					<text class="price" v-show="totalPrice">￥{{totalPrice}}</text>
				</view>
				<view class="compute btn u-line-1" @click="preViewOrder">结算</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				params:{},
				show: false,
				allPrice:0,
				options: [
					{
						text: '移入收藏',
						style: {
							backgroundColor: '#FA8072',
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: 'red'
						}
					}
				]
			};
		},
		computed: {
			...mapState({
				cartsList: state => state.shopcart.cartList
			}),
			// 步进器只能数字，所以转换一下
			cartList() {
				if(this.cartsList) {
					for(var i = 0; i < this.cartsList.length; i++) {
						this.cartsList[i].skuNum = parseInt(this.cartsList[i].skuNum);
						this.cartsList[i].isChecked = this.cartsList[i].isChecked == '1' ? true : false;
					}
					return this.cartsList
				}
			},
			// 总价
			totalPrice() {
				if(this.cartList) {
					let sum = 0;
					this.cartList.forEach(item => {
						if(item.isChecked) {
							sum += (+item.skuNum) * item.price; 
						}
						
					})
					return sum
				}
			},
			// 判断是否全选框是否勾选
			isAllCheck: {
				get(){
					if(this.cartList) {
						return this.cartList.every(item => item.isChecked == true)
					}else {
						return false
					}
				},
				set(val){}
			}
		},
		methods: {
			// 获取购物车数据
			async getCartList() {
				await this.$store.dispatch('getCartList');
			},
			// 改变产品数量
			async changeSkuNum(e) {
				// console.log(e)
				try{
					this.params.skuId = e.index.toString();
					this.params.skuNum = e.value
					// 派发action
					await this.$store.dispatch('changeSkuNum', this.params)
					// 修改成功，再次获取数据
					this.getCartList()
				}catch(e){
					this.$u.toast(e)
				}
			},
			// 删除购物车、移入收藏
			async click(index, index1) {
				if(index1 == 1) {
					// 删除
					try{
						// 派发action
						await this.$store.dispatch('deleteCart', {skuId:index})
						// 删除成功
						this.getCartList()
					}catch(e){
						this.$u.toast(e)
					}
				} else {
					try{
						// 派发action
						let _id = index.toString();
						await this.$store.dispatch('collectProduct', {_id})
						// 收藏成功
						// 移出购物车
						// 派发action
						await this.$store.dispatch('deleteCart', {skuId:index})
						// 删除成功
						this.getCartList()
					}catch(e){
						this.$u.toast(e)
					}
				}
			},
			// 改变选中状态
			async changeCheck(e) {
				// console.log(e)
				try{
					const params = {
						// skuId:e.name
					}
					params.skuId = e.name.toString()
					params.isChecked = e.value ? '1' : '0'
					await this.$store.dispatch('changeChecked', params)
					// 修改成功
				}catch(e){
					this.$u.toast(e)
				}
			},
			// 全选
			async isAllChecked(e) {
				console.log(e)
				try{
					let isChecked = e ? '0' : '1';
					// 派发action
					await this.$store.dispatch('isAllChecked', isChecked);
				}catch(e){
					this.$u.toast(e)
				}
			},
			// 获取选中商品的价格
			getPrice() {
				let checkPrice = [];
				this.cartList.map(item => {
					if (item.isChecked) {
						checkPrice.push(item.price * item.skuNum)
					}
				})
				console.log(this.cartList)
				this.allPrice = checkPrice.reduce((pre, current) => {
					return pre + current
				}, 0)
				
			},
			// 去商品详情
			toDetail(e) {
				// console.log(e)
				this.$u.route({
					url:'pages/goods/detail',
					params:{id:e}
				})
			},
			// 去订单预览页
			preViewOrder() {
				if(this.totalPrice) {
					this.$u.route({
						url:'pages/order/preViewOrder',
						params:{totalPrice:this.totalPrice}
					})
				}else {
					this.$refs.uToast.show({title: '您还没有选择商品哦'})
				}
			},
			open(id) {
				if(this.cartList) {
					let index = this.cartList.findIndex(item => {
						return item._id == id
					})
					this.cartList[index].show = true;
					this.cartList.map((val, idx) => {
						if(index != idx) this.cartList[idx].show = false;
					})
				}
			}
		},
		onTabItemTap() {
			this.getCartList()
			// this.getPrice()
		},
		onLoad() {
			if(!this.$u.utils.isLogin()) return
			this.getCartList()
			// this.getPrice()
		}
	};
</script>

<style lang="scss" scoped>
	.cartList {
		margin-bottom: 100rpx;
	}
	.item {
		display: flex;
		padding: 20rpx 30rpx 20rpx;
		height: 280rpx;
		align-items: center;
		
	}
	image {
		width: 180rpx;
		flex: 0 0 180rpx;
		height: 220rpx;
		margin-right: 30rpx;
		border-radius: 12rpx;
		background-color: #F5F5F5;
	}
	.right{
		.title {
			text-align: left;
			font-size: 28rpx;
			padding-right: 10rpx;
			font-weight: bold;
		}
		.attr {
			height: 44rpx;
			background-color: #F5F5F5;
			border-radius: 10rpx;
			line-height: 44rpx;
			padding: 0 20rpx;
			margin-top: 20rpx;
			margin-bottom: 30rpx;
			color: #888;
		}
		.skuNum {
			display: flex;
			justify-content: space-between;
			.price {
				color: #FF4500;
				font-size: 38rpx;
				font-weight: bold;
			}
			.num {
				margin-left: 100rpx;
			}
		}
	}
	.footer {
		background-color: #fff;
			position: fixed;
			display: flex;
			bottom: 100rpx;
			height: 100rpx;
			line-height: 100rpx;
			width: 100%;
		}
		.price {
			color: #FF4500;
			font-size: 38rpx;
			font-weight: bold;
		}
		.compute {
			background-image: linear-gradient(to right,#FF7F50,	#FF4500);
			width: 160rpx;
			line-height: 33px;
			text-align: center;
			border-radius: 18px;
			color: #ffffff;
		}
	
	
</style>

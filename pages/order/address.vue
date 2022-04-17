<template>
	<view>
		<view class="item" v-for="(address, index) in addressList" :key="address.id" @click="chooseAddress(address.id)">
			<view class="top">
				<view class="name">{{ address.name }}</view>
				<view class="phone">{{ address.phone }}</view>
				<view class="tag" v-show="address.isDefault">
					<text>默认</text>
				</view>
			</view>
			<view class="bottom">
				{{address.area}}{{address.address}}
				<view class="icon">
					<u-icon name="edit-pen" :size="40" color="#999999" @click="toChangeAddress(address)"></u-icon>
					<u-icon name="trash" :size="40" color="red" @click="deleteAddress(address.id)"></u-icon>
				</view>
			</view>
		</view>
		<view class="addSite" @click="toAddSite">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>
				添加收货地址
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
export default {
	data() {
		return {
		};
	},
	computed: {
		...mapState({
			addressList: state => state.order.addressList
		})
	},
	onLoad() {
		this.getAddress();
	},
	methods: {
		async getAddress() {
			try{
				await this.$store.dispatch('getAddress')
			}catch(e){
				this.$u.toast(e)
			}
		},
		// 添加地址
		toAddSite(){
			this.$u.route({
			    url: 'pages/order/addSite'
			});
		},
		// 编辑地址
		toChangeAddress(params) {
			// console.log(params)
			this.$u.route({
				url:'pages/order/changeAddress',
				params
			})
		},
		// 删除地址
		async deleteAddress(id) {
			// console.log(id)
			try{
				await this.$store.dispatch('deleteAddress', {id})
				// 删除成功，再次获取数据
				this.getAddress()
			}catch(e){
				this.$u.toast(e)
			}
		},
		// 选择地址
		chooseAddress(id) {
			uni.setStorageSync('ADDRESSID', id);
			this.$u.route({
				url:'pages/order/preViewOrder',
				type:'back'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	padding: 40rpx 20rpx;
	.top {
		display: flex;
		align-items: center;
		.name {
			font-weight: bold;
			font-size: 34rpx;
		}
		.phone {
			margin-left: 10rpx;
			color: #888;
		}
		.tag {
			font-weight: normal;
			width: 60rpx;
			height: 34rpx;
			line-height: 34rpx;
			color: orange;
			font-size: 20rpx;
			border-radius: 6rpx;
			text-align: center;
			margin-left: 30rpx;
			border: 1px solid orange;
			
		}
	}
	.bottom {
		display: flex;
		margin-top: 20rpx;
		font-size: 28rpx;
		justify-content: space-between;
		color: #999999;
		.icon {
			width:100rpx;
			display: flex;
			justify-content: space-between;
		}
	}
}
.addSite {
	display: flex;
	justify-content: space-around;
	width: 640rpx;
	line-height: 76rpx;
	position: absolute;
	bottom: 30rpx;
	left: 56rpx;
	background-color: orange;
	border-radius: 60rpx;
	font-size: 30rpx;
	.add{
		display: flex;
		align-items: center;
		color: #ffffff;
		.icon{
			margin-right: 10rpx;
		}
	}
}
</style>

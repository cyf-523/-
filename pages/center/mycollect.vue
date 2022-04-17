<template>
	<view class="">
		<u-swipe-action
			:btn-width="140"
			:show="item.show" 
			:index="item.id"
			v-for="(item, index) in collectList" 
			:key="item.id" 
			@click="click" 
			@open="open"
			@content-click="toDetail"
			:options="options"
		>
			<view class="item u-border-bottom">
				<image mode="aspectFit" :src="item.cover_url"  />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="right">
					<view class="title-wrap">
						<text class="title u-line-2">{{ item.title }}</text>
					</view>
					<view class="price">￥{{item.price}}</view>		
				</view>
			</view>
		</u-swipe-action>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: 'red'
						}
					}
				]
			}
		},
		computed: {
			...mapState({
				collectList: state => state.collect.collectList
			})
		},
		methods: {
			// 获取收藏列表
			async getMycollect() {
				await this.$store.dispatch('getMycollect')
			},
			toDetail(e) {
				// console.log(e)
				this.$u.route({
					url:'pages/goods/detail',
					params:{id:e}
				})
			},
			// 删除收藏
			async click(index, index1) {
				if(index1 == 0) {
					console.log(index,index1)
					// 删除
					try{
						// 派发action
						await this.$store.dispatch('collectProduct', {id:index});
						// this.$store.dispatch('deleteCart', {skuId:index})
						// 删除成功
						this.getMycollect()
						// this.$u.toast('取消收藏成功')
						this.$refs.uToast.show({title: '取消收藏成功'})
					}catch(e){
						this.$u.toast(e)
					}
				} 
			},	
			open(id) {
				if(this.collectList) {
					let index = this.collectList.findIndex(item => {
						return item.id == id
					})
					this.collectList[index].show = true;
					this.collectList.map((val, idx) => {
						if(index != idx) this.collectList[idx].show = false;
					})
				}
			}
		},
		onLoad() {
			this.getMycollect()
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		padding: 20rpx 30rpx 20rpx;
		height: 260rpx;
		align-items: center;		
	}
	image {
		width: 220rpx;
		flex: 0 0 220rpx;
		height: 220rpx;
		margin-right: 30rpx;
		border-radius: 12rpx;
		background-color: #F5F5F5;
	}
	.right{
		.title {
			font-size: 30rpx;
			font-weight: bold;
			margin-top: -90rpx;
			margin-bottom: 30rpx;
		}
		.price {
			font-size: 34rpx;
			color: #FF4500;
			// margin-bottom: -20rpx;
		}
	}
</style>

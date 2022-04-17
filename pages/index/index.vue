<template>
	<view class="content">
		<Search></Search>
		<Swiper :list="list"></Swiper>
		<view class="card">
			<view class="item item1">
				<text>聚划算</text>
				<view class="icon">限时抢</view>
				<view class="img">
					<image class="img1" src="/static/images/home/card/02.jpg" mode=""></image>
					<image class="img2" src="/static/images/home/card/01.jpg" ></image>
				</view>
			</view>
			<view class="item item2">
				<text>聚划算</text>
				<view class="icon">限时抢</view>
				<view class="img">
					<image class="img1" src="/static/images/home/card/03.jpg" mode=""></image>
					<image class="img2" src="/static/images/home/card/04.jpg" ></image>
				</view>
			</view>
			<view class="item item3">
				<text>有好货</text>
				<view class="icon">好口碑</view>
				<view class="img">
					<image class="img1" src="/static/images/home/card/05.jpg" mode=""></image>
					<image class="img2" src="/static/images/home/card/06.jpg" ></image>
				</view>
			</view>
			<view class="item item4">
				<text>聚划算</text>
				<view class="icon">限时抢</view>
				<view class="img">
					<image class="img1" src="/static/images/home/card/07.jpg" mode=""></image>
					<image class="img2" src="/static/images/home/card/08.jpg" ></image>
				</view>
			</view>
		</view>
		<view class="sort">
			<u-tabs :list="sortList" :current="currentSort"  :is-scroll="false" active-color="#FF8888"  @change="changeSort"></u-tabs>
		</view>
		<!-- <u-tabs :list="sortList" :is-scroll="false" :current="currentSort" @change="changeSort"></u-tabs> -->
		
		<!-- <goods :goods="goods"></goods> -->
		<u-row gutter="16" class="u-skeleton" style="padding-left: 10rpx;padding-right: 10rpx;">
			<u-col span="6" v-for="(good, index) in goods.length !==0 ? goods : [{skuInfo:{}}, {skuInfo:{}}, {skuInfo:{}}, {skuInfo:{}}]" :key="good.skuInfo.id">
				<goods v-show="goods.length != 0" :good="good"></goods>
			</u-col>
		</u-row>
		<u-empty text="数据为空" mode="data" v-show="goods.length == 0"></u-empty>
		<u-divider bg-color="#F5F5F5" :height='60' border-color='#888' v-show="goods.length != 0">到底了</u-divider>
		<!-- 骨架屏 -->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				slides: [
					{
						"id": 1,
						"title": "古月商城",
						"img_url": "http://192.168.79.1:3000/static/images/home/swiper/01.jpg"
					},
					{
						"id": 2,
						"title": "古月商城",
						"img_url": "http://192.168.79.1:3000/static/images/home/swiper/02.jpg"
					},
					{
						"id": 3,
						"title": "古月商城",
						"img_url": "http://192.168.79.1:3000/static/images/home/swiper/03.jpg"
					},
					{
						"id": 4,
						"title": "古月商城",
						"img_url": "http://192.168.79.1:3000/static/images/home/swiper/04.jpg"
					}
				],
				goods: [],
				sortList: [
					{ name: '默认'}, 
					{ name: '销量'}, 
					{ name: '推荐' },
					{ name: '最新' }
				],
				currentSort: 0,
				params: {
					pageNo: 1,     //分页
				},
				loading: false,  //骨架屏
				// scrollTop: 0,
				
			}
		},
		computed: {
				list() {
					return this.slides.map(item => {
						return item.img_url
					})
				}
		},
		methods: {
			// 获取数据
			async getData() {
				// 请求数据之前显示骨架屏
				this.loading = true;
				// 增加排序条件
				if(this.currentSort == 1) this.params.sort = 1;
				if(this.currentSort == 2) this.params.sort = 2;
				if(this.currentSort == 3) this.params.sort = 3;
				// 发送请求，获取商品数据
				let result = await this.$u.api.reqGetProductList(this.params);
				// 隐藏骨架屏
				this.loading = false
				// console.log(result)
				if(result.code == 200) {
					// 存储数据
					this.goods = [...this.goods, ...result.data];
				}else {
					this.$u.toast('没用更多了')
				}
				
				
			},
			// 排序
			changeSort(index) {
				
				this.currentSort = index;
				// 置空商品列表
				this.goods = [];
				this.params.pageNo = 1;
				this.getData();
				
			},
			// 触底加载更多
			onReachBottom() {
				this.params.pageNo += 1;
				// console.log(this.page)
				this.getData()
			},
			
		},
		
		onLoad() {
			this.getData()
		}
	}
</script>
<style>
	page {
		background-color: #F5F5F5;
	}
</style>
<style lang="scss" scoped>
	.content {
		.card {
			height: 520rpx;
			display: flex;
			flex-wrap: wrap;
			border-radius: 20rpx;
			background-color: 	#fff;
			background-image: linear-gradient(pink, #fff, #fff, #fff, #fff, #fff,#fff);
			box-shadow: 10rpx 10rpx 10rpx rgba(0,0,0,0.1);
			margin: 0 20rpx;
			// padding: 10rpx;
			.item {
				padding: 10rpx 10rpx 0;
				width: 50%;
				height: 50%;
				display: flex;
				flex-wrap: wrap;
				text {
					font-weight: bold;
					font-size: 30rpx;
				}
				.icon {
					width: 100rpx;
					height: 40rpx;
					border-radius: 10rpx;
					color: #fff;
					text-align: center;
					line-height: 40rpx;
					margin-left: 10rpx;
				}
				.img {
					width: 100%;
					height: 160rpx;
					display: flex;
					.img1 {
						height: 140rpx;
						width: 140rpx;
					}
					.img2 {
							margin-left: 20rpx;
							height: 160rpx;
							width: 160rpx;
					}
				}
				
				
			}
			.item1 {
				border-right: 2rpx solid #ccc;
				border-bottom: 2rpx solid #ccc;
				.icon {
					background-color: #FF8C00;
				}
			}
			.item2 {
				border-bottom: 2rpx solid #ccc;
				.icon {
					background-color: #FF0000;
				}
			}
			.item3 {
				border-right: 2rpx solid #ccc;
				.icon {
					background-color: #1E90FF;
				}
			}
			.item4 {
				.icon {
					background-color: #FF4500;
				}
			}
		}
		.sort {
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			padding: 0 20rpx;
			// text-align: center
		}
		
		
	}
</style>

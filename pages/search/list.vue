<template>
	<view class="">
		<u-navbar title="" :back-icon-size='28' back-icon-color="#696969" :height="50" :background="{background:'#FFF0F5'}">
			<view class="slot-wrap">
				<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
				<u-search v-model="keyword" disabled :show-action="false" height="60"  placeholder="搜索商品" bg-color="#fff" border-color="#FF8888" @click="goSearch"></u-search>
			</view>
		</u-navbar>
		<view class="sort">
			<view class="item" v-for="item in sortList" :key="item.id" @click="sort(item.id)">{{item.text}}</view>
		</view>
		<u-row gutter="16" class="u-skeleton" style="padding-left: 10rpx;padding-right: 10rpx;">
			<u-col span="6" v-for="(good, index) in searchProduct.length !==0 ? searchProduct : [{skuInfo:{}}, {skuInfo:{}}, {skuInfo:{}}, {skuInfo:{}}]" :key="good.skuInfo.id">
				<goods v-show="searchProduct.length != 0" :good="good"></goods>
			</u-col>
		</u-row>
		<u-empty text="数据为空" mode="data" v-show="searchProduct.length == 0"></u-empty>
		<u-divider bg-color="#F5F5F5" :height='60' border-color='#888' v-show="searchProduct.length != 0">到底了</u-divider>
		<!-- 骨架屏 -->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:'',
				// 排序数据
				sortList:[
					{text:"综合推荐", id:"moren"},
					{text:"销量", id:"sales"},
					{text:"价格", id:"price"}
				],
				params:{
					pageNo:1,
					desc: -1,
					sortId:''
				},
				loading: false,  //骨架屏
				searchProduct:[]
				
			}
		},
		methods: {
			// 派发action，获取商品列表数据
			async getSearchProduct() {
				// 请求数据之前显示骨架屏
				this.loading = true;
				this.params.keyword = this.keyword;
				let result = await this.$u.api.reqSearchProduct(this.params);
				this.loading = false
				if(result.code == 200) {
					// 存储数据
					this.searchProduct = [...this.searchProduct, ...result.data];
				}else {
					this.$u.toast('没用更多了')
				}
			},
			// 排序
			sort(id) {
				this.params.sortId = id;
				// 置空商品列表
				this.searchProduct = [];
				this.params.pageNo = 1
				this.getSearchProduct()
			},
			// 去搜索页
			goSearch() {
				this.$u.route({
					url: 'pages/search/index'
				})
			},
		},
		// 触底加载更多
		onReachBottom() {
			this.params.pageNo += 1;
			// console.log(this.page)
			this.getSearchProduct()
		},
		onLoad(option) {
			// console.log(option)
			this.keyword = option.keyword;
			this.getSearchProduct()
			
		}
	}
</script>

<style lang="scss" scoped>
	// page {
	// 	background-color: #F5F5F5;
	// }
	.slot-wrap {
		margin-right: 20rpx;
		width:100%;
		// display: flex;
		// align-items: center;
		// flex: 1;
	}
	.sort {
		display: flex;
		background-image: linear-gradient(pink,#fff,#fff);
		height: 80rpx;
		justify-content: space-around;
		border-radius: 20rpx 20rpx 0 0;
		margin-bottom: 10rpx;
		// padding-top: 20rpx;
		.item {
			width: 33.3333%;
			text-align: center;
			line-height: 80rpx;
			color: #888;
			font-size: 30rpx;
			// position: relative;
			&:last-child:after {
				content: '';
				position: relative;
				width: 0;
				height: 0;
				font-size: 0;
				border: 8rpx solid transparent;
				border-top-color: #888;
				top: -4rpx;
				left: 10rpx;
			}
		}
	}
</style>

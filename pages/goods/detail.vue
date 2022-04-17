<template>
	<view class="container">
		<Search></Search>
		<view class="wrap">
			<u-swiper :list="swiperList" :height="750" mode="number" indicator-pos="bottomRight" :autoplay="false" img-mode="aspectFit" @click="previewImage"></u-swiper>
		</view>
		<!-- 商品信息 -->
		<view class="productInfo">
			<text class="price">￥{{skuInfo.price}}</text>
			<view class="intro">
				<view class="card">iFashion</view>
				<text u-line-1>追流行趋势，买风格新品</text>
				<view class="sales" v-show="skuInfo.sales <= 2000">月销 {{skuInfo.sales}}</view>
				<view class="sales" v-show="skuInfo.sales > 2000">月销 2000+</view>
			</view>
			<view class="title">{{skuInfo.title}}</view>
		</view>
		<!-- 点击颜色弹框 -->
		<u-popup v-model="show" mode="bottom">
			<view class="content">
				<view class="header">
					<image :src="swiperList[0]" mode="" style="height: 120rpx;width: 120rpx;border-radius: 10rpx;"></image>
					<view class="price">￥{{skuInfo.price}}</view>
				</view>
				<scroll-view scroll-y="true" style="height: 800rpx;">
					<view class="attrs" v-for="(spuSaleAttr, index) in spuSaleAttrList" :key="spuSaleAttr.id">
						<text>{{spuSaleAttr.saleAttrName}} ({{spuSaleAttr.spuSaleAttrValueList.length}})</text>
						<view class="category">
							<view 
								class="attr" 
								v-for="(attr, index) in spuSaleAttr.spuSaleAttrValueList" 
								:key="attr.id"
								:class="{active: attr.isChecked == 1}"
								@click="changeActive(attr, spuSaleAttr.spuSaleAttrValueList)"
							>
								{{attr.saleAttrValueName}}
							</view>
						</view>
					</view>
					<view class="payNum">
						<text>购买数量</text>
						<view class="stock">库存：{{skuInfo.stock}}</view>
						<view class="num">
							<u-number-box v-model="value" @change="valChange" :min="1" :max="skuInfo.stock"></u-number-box>
						</view>
					</view>
				</scroll-view>
				<view class="right">
					<view class="cart btn u-line-1" @click="addShopCart">加入购物车</view>
					<view class="buy btn u-line-1" @click="buy">立即购买</view>
				</view>
			</view>
		</u-popup>
		<!-- 商品属性 -->
		<view class="productAttr">
			<view class="item" @click="show = true">
				<view class="title">选择</view>
				<view class="attr">颜色分类</view>
				<view class="enter"></view>
			</view>
			<view class="item">
				<view class="title">发货</view>
				<view class="attr">湖北孝感 | 快递：免运费</view>
			</view>
			<view class="item">
				<view class="title">保障</view>
				<view class="attr">假一赔四 · 过敏包退 · 退货运费险</view>
			</view>
		</view>
		<!-- 商品评论 -->
		<view class="comment" @click="goComment">
			<view class="title">商品评价</view>
			<view class="all">
				<text>查看全部</text>
				<view class="enter"></view>
			</view>
		</view>
		<u-divider bg-color="#F5F5F5" style="margin-bottom: 20rpx;">商品详情</u-divider>
		<view class="">
			<image style="margin-top: -7rpx;" class="detail" :src="pic" mode="" v-for="(pic,index) in pics" :key="index" mode="widthFix"></image>
		</view>
		<!-- 猜你喜欢 -->
		<u-divider bg-color="#F5F5F5" style="margin-bottom: 10rpx;">猜你喜欢</u-divider>
		<view class="like_goods">
			<u-row gutter="16" class="u-skeleton">
				<u-col span="6" v-for="(good, index) in like_goods.length !==0 ? like_goods : [{}, {}, {}, {}]" :key="like_goods.id">
					<goods :good="good"></goods>
				</u-col>
			</u-row>
		</view>
		<!-- 点击加入购物车弹框 -->
		<u-popup v-model="display" mode="bottom">
			<view class="content">
				<view class="header">
					<image :src="swiperList[0]" mode="" style="height: 120rpx;width: 120rpx;border-radius: 10rpx;"></image>
					<view class="price">￥{{skuInfo.price}}</view>
				</view>
				<scroll-view scroll-y="true" style="height: 800rpx;">
					<view class="attrs" v-for="(spuSaleAttr, index) in spuSaleAttrList" :key="spuSaleAttr.id">
						<text>{{spuSaleAttr.saleAttrName}} ({{spuSaleAttr.spuSaleAttrValueList.length}})</text>
						<view class="category">
							<view 
								class="attr" 
								v-for="(attr, index) in spuSaleAttr.spuSaleAttrValueList" 
								:key="attr.id"
								:class="{active: attr.isChecked == 1}"
								@click="changeActive(attr, spuSaleAttr.spuSaleAttrValueList)"
							>
								{{attr.saleAttrValueName}}
							</view>
						</view>
					</view>
					<view class="payNum">
						<text>购买数量</text>
						<view class="stock">库存：{{skuInfo.stock}}</view>
						<view class="num">
							<u-number-box v-model="value" @change="valChange" :min="1" :max="skuInfo.stock"></u-number-box>
						</view>
					</view>
				</scroll-view>
				<view class="confrim-btn">
					<view class="sure u-line-1" @click="addShopCart">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 点击立即购买弹框 -->
		<u-popup v-model="pop" mode="bottom">
			<view class="content">
				<view class="header">
					<image :src="swiperList[0]" mode="" style="height: 120rpx;width: 120rpx;border-radius: 10rpx;"></image>
					<view class="price">￥{{skuInfo.price}}</view>
				</view>
				<scroll-view scroll-y="true" style="height: 800rpx;">
					<view class="attrs" v-for="(spuSaleAttr, index) in spuSaleAttrList" :key="spuSaleAttr.id">
						<text>{{spuSaleAttr.saleAttrName}} ({{spuSaleAttr.spuSaleAttrValueList.length}})</text>
						<view class="category">
							<view 
								class="attr" 
								v-for="(attr, index) in spuSaleAttr.spuSaleAttrValueList" 
								:key="attr.id"
								:class="{active: attr.isChecked == 1}"
								@click="changeActive(attr, spuSaleAttr.spuSaleAttrValueList)"
							>
								{{attr.saleAttrValueName}}
							</view>
						</view>
					</view>
					<view class="payNum">
						<text>购买数量</text>
						<view class="stock">库存：{{skuInfo.stock}}</view>
						<view class="num">
							<u-number-box v-model="value" @change="valChange" :min="1" :max="skuInfo.stock"></u-number-box>
						</view>
					</view>
				</scroll-view>
				<view class="confrim-btn">
					<view class="sure u-line-1" @click="buy">立即购买</view>
				</view>
			</view>
		</u-popup>
		<!-- 底部加入购物车 -->
		<view class="navigation u-absolute">
			<view class="left">
				<view class="item u-text-center" @click="collect">
					<block v-if="isCollect === 0">
						<u-icon name="star" :size="40"></u-icon>
						<view class="text u-line-1">收藏</view>
					</block>
					<block v-else>
						<u-icon name="star-fill" :size="40" color="#ed3f14"></u-icon>
						<view class="text u-line-1" style="color: #ed3f14">已收藏</view>
					</block>
				</view>
				<view class="item car" @click="goShopCart">
					<u-badge class="car-num" :count="cartCount" type="error" :offset="[-4, 20]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="addCart">加入购物车</view>
				<view class="buy btn u-line-1" @click="buyNow">立即购买</view>
			</view>
		</view>
		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import {mapState} from 'vuex';
export default {
	data() {
		return {
			show: false,
			display:false,
			pop:false,
			goodsId: null, //商品id
			// commentList:[], //评论列表
			loading: false, // 信息加载
			// isCollect:false,
			value:1,
			skuNum:0
		}
	},
	computed: {
		...mapState({
			swiperList: state => state.detail.swiperList,
			skuInfo: state => state.detail.skuInfo,
			spuSaleAttrList:state => state.detail.spuSaleAttrList,
			// comments:state => state.detail.comments,
			pics:state => state.detail.pics,
			like_goods: state => state.detail.like_goods,
			isCollect: state => state.detail.productDetail.is_collect,
			cartList: state => state.shopcart.cartList
		}),
		cartCount() {
			if(this.cartList) {
				return this.cartList.length
			}
		}
	},
	methods: {
		// 去商品评价
		goComment() {
			// let commentList = this.comments.join();
			// console.log(this.comments)
			this.$u.route({
				url:'pages/goods/comment',
				params:{skuId:this.goodsId}
			})
		},
		getProductDetial() {
			// 派发action,获取商品详情
			this.$store.dispatch('getProductDetial', {id: this.goodsId})
		},
		// 预览图片
		previewImage(index) {
			// console.log(index)
			uni.previewImage({
				urls: this.swiperList
			})
		},
		// 改变高亮
		changeActive(attr, arr) {
			arr.forEach(item => {
				item.isChecked = 0;
			});
			attr.isChecked = 1;
		},
		// 商品收藏
		async collect() {
			if(!this.$u.utils.isLogin()) return
			try{
				const params = { id: this.goodsId}
				await this.$store.dispatch('collectProduct', params);
				// 收藏成功，再次获取数据
				this.getProductDetial()
				this.isCollect == 0 ? this.$refs.uToast.show({title: '收藏成功'}) : this.$refs.uToast.show({title: '取消收藏'})
			}catch(e){
				this.$u.toast(e)
			}
		},
		// 加入购物车
		async addShopCart() {
			if(!this.$u.utils.isLogin()) return
			this.show = false;
			this.display = false;
			try{
				const params = {
					skuId:this.goodsId,
					skuNum:this.value
				}
				let attrList = this.spuSaleAttrList.map(item => item.spuSaleAttrValueList)
				params.color = (attrList[0].find(item => item.isChecked == 1)).saleAttrValueName;
				if(attrList[1]) {
					params.size = (attrList[1].find(item => item.isChecked == 1)).saleAttrValueName;
				}
				// 派发action
				await this.$store.dispatch('addShopCart', params)
				this.getCartList()
				// this.$u.toast('添加成功')
				this.$refs.uToast.show({title: '添加成功'})
			}catch(e){
				this.$u.toast(e)
			}
		},
		// 底部加入购物车按钮
		addCart() {
			if(!this.$u.utils.isLogin()) return
			this.display = true
		},
		// 立即购买
		buy() {
			if(!this.$u.utils.isLogin()) return
			// 跳转到确认订单界面
			const params = {
				skuId:this.goodsId,
				skuNum:this.value
			}
			this.$u.route({
				url:'pages/order/preView',
				params
			})
		},
		// 底部立即购买按钮
		buyNow() {
			if(!this.$u.utils.isLogin()) return
			this.pop = true
		},
		// 数量增加或减少
		valChange(e) {
			// console.log(this.value)
		},
		// 获取购物车数据
		async getCartList() {
			await this.$store.dispatch('getCartList');
		},
		// 去购物车
		goShopCart() {
			this.$u.route({
				url: 'pages/cart/index',
				type:'switchTab'
			})
		}
		
	},
	onLoad(option) {
		this.goodsId = option.id;
		this.getProductDetial()
		if(this.$store.state.user.token) {
			this.getCartList()
		}
		
	}
}
</script>

<style lang="scss" scoped>
page {
	background-color: #F5F5F5;
}
// .container {
// 	margin-bottom: 100rpx;
// }
.productInfo {
	background-color: #FFFFFF;
	margin: 20rpx 10rpx;
	// border: 1px solid black;
	border-radius: 20rpx;
	height: 240rpx;
	padding: 20rpx 30rpx;
	.price {
		color: #FF4500;
		font-size: 38rpx;
		font-weight: bold;
	}
	.intro {
		margin-top: 10rpx;
		display: flex;
		// justify-content: space-between;
		.card {
			width: 140rpx;
			height: 40rpx;
			text-align: center;
			line-height: 40rpx;
			border-radius: 30rpx;
			background-color: 	#9932CC;
			color: #FFFFFF;
		}
		text {
			width: 340rpx;
			margin-left: 20rpx;
			// height: 40rpx;
			color: #888;
		}
		.sales {
			margin-left: 38rpx;
			// margin-right: 20rpx;
			color: #888;
		}
	}
	.title {
		margin-top: 10rpx;
		font-size: 30rpx;
		font-weight: bold;
	}
}
.content {
	.header {
		// margin: 20rpx;
		display: flex;
		padding: 20rpx;
		border-bottom: 1px solid #F5F5F5;
		.price {
			color: #FF4500;
			font-size: 38rpx;
			font-weight: bold;
			margin-left: 20rpx;
			margin-top: 10rpx;
		}
	}
	.attrs {
		padding: 20rpx;
		border-bottom: 1px solid #F5F5F5;
		text {
			font-size: 30rpx;
		}
		.category {
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;
			.active {
				border: 1px solid #ed3f14;
				color: #ed3f14;
				background-color: #FFDEAD;
			}
			.attr {
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				// width: 200rpx;
				min-width: 200rpx;
				padding: 0 20rpx;
				height: 80rpx;
				border-radius: 10rpx;
				text-align: center;
				line-height: 80rpx;
				background-color: #F5F5F5;
			}
		}
	}
	.payNum {
		padding: 20rpx;
		display: flex;
		align-items: center;
		text {
			font-size: 30rpx;
			margin-right: 20rpx;
		}
		.stock {
			color: #888;
		}
		.num {
			margin-left: 200rpx;
		}
		
	}
	.sure {
		line-height: 72rpx;
		font-size: 30rpx;
		// padding: 0 30rpx;
		border-radius: 36rpx;
		color: #ffffff;
		background-color: #ed3f14;
		text-align: center;
		margin: 20rpx 20rpx 40rpx;
	}
	.right {
		padding: 20rpx;
		height: 160rpx;
		width: 100%;
		display: flex;
		font-size: 30rpx;
		align-items: center;
		.btn {
			line-height: 72rpx;
			text-align: center;
			color: #ffffff;
		}
		.cart {
			background-color: #ff7900;
			flex: 1;
			border-radius: 36rpx 0 0 36rpx;
		}
		.buy {
			
			background-color: #ed3f14;
			flex: 1;
			border-radius: 0 36rpx 36rpx 0;
		}
	}
	
}
.productAttr {
	// border: 1px solid black;
	height: 230rpx;
	background-color: #FFFFFF;
	margin: 0 10rpx 20rpx;
	border-radius: 20rpx;
	padding: 20rpx 30rpx;
	.title {
		margin-right: 40rpx;
		color: #888;
	}
	.item {
		display: flex;
		margin: 20rpx;
		align-items: center;
		.attr {
			font-size: 30rpx;
			margin-top: -2rpx;
		}
		.enter {
			margin-left: 400rpx;
			// margin-right: 10rpx;
			margin-top: -20rpx;
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
.comment {
	height: 80rpx;
	background-color: #FFFFFF;
	margin: 0 10rpx 20rpx;
	border-radius: 20rpx;
	display: flex;
	justify-content: space-between;
	padding: 20rpx;
	.title {
		font-size: 30rpx;
		font-weight: bold;
	}
	.all {
		display: flex;
		color: #FF4500;
		.enter {
			margin-left: 10rpx;
			// margin-right: 10rpx;
			margin-top: 7rpx;
			position: relative;
			&:after,
			&:before {
				content: '';
				position: absolute;
				width: 0;
				height: 0;
				font-size: 0;
				border: 12rpx solid transparent;
				border-left-color: #FF4500;
			}
			&:after {
				border-left-color: #fff;
				left: -2rpx;
			}
		}
	}
	
}
.detail {
	// margin-top: 20rpx;
	width: 100%;
	&:last-child {
		margin-bottom: 10rpx;
	}
}
.like_goods {
	padding-bottom: 100rpx;
}
.navigation {
	position: fixed;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	width: 100%;
	background-color: #ffffff;
	padding: 16rpx 0;
	.left {
		display: flex;
		font-size: 20rpx;
		.item {
			width: 120rpx;
			// margin: 0 28rpx;
			text-align: center;
			&.car {
				
				position: relative;
				.car-num {
					position: absolute;
					// position: relative;
					// top: -10rpx;
					// right: -20rpx;
					// left: -100rpx;
				}
			}
		}
	}
	.right {
		margin-right: 20rpx;
		display: flex;
		font-size: 28rpx;
		width: 440rpx;
		align-items: center;
		.btn {
			line-height: 66rpx;
			padding: 0 30rpx;
			text-align: center;
			color: #ffffff;
		}
		.cart {
			background-color: #ff7900;
			flex: 1;
			border-radius: 36rpx 0 0 36rpx;
		}
		.buy {
			
			background-color: #ed3f14;
			flex: 1;
			border-radius: 0 36rpx 36rpx 0;
		}
	}
}
</style>

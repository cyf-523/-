<template>
	<view>
		<u-navbar title="" :back-icon-size='28' back-icon-color="#696969" :height="50" :background="{background:'#FFF0F5'}">
			<view class="slot-wrap">
				<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
				<u-search disabled :show-action="false" height="60"  placeholder="搜索商品" bg-color="#fff" border-color="#FF8888" @click="goSearch"></u-search>
			</view>
		</u-navbar>
		<view class="comment" v-for="(comment, index) in commentList" :key="comment.id">
			<view class="user">
				<view class="left"><image :src="comment.user.avatar_url" mode="aspectFill"></image></view>
				<view class="right">
					<view class="name">{{ comment.user.name }}</view>
					<view class="time">{{ comment.created_at }}</view>
				</view>
			</view>
			<view class="content">{{ comment.content }}</view>
			<view class="img">
				<image :src="pic" mode="aspectFit" v-for="pic in comment.pics"></image>
			</view>
		</view>
	</view>
</template>

<script>
import {mapState} from 'vuex';
export default {
	data() {
		return {
			skuId:'', // 商品id
		};
	},
	computed: {
		...mapState({
			commentList:state => state.detail.comments,
		})
	},
	onLoad(option) {
		this.skuId = option.skuId;
		this.getProductDetial()
	},
	methods: {
		// 去搜索页
		goSearch() {
			this.$u.route({
				url: 'pages/search/index'
			})
		},
		// 获取商品评价
		getProductDetial() {
			// 派发action,获取商品详情
			this.$store.dispatch('getProductDetial', {id: this.skuId})
		}				
	}
};
</script>

<style lang="scss" scoped>
	.slot-wrap {
		margin-right: 20rpx;
		width:100%;
	}
.comment {
	padding: 30rpx;
	.user {
		display: flex;
		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}
		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;
			.name {
				color: #5677fc;
			}
			.time {
				margin-top: 10rpx;
				font-size: 24rpx;
				color: #9a9a9a;
			}
		}
	}
	.content {
		margin: 10rpx 0 20rpx 0;
	}
	.img {
		image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 20rpx;
			margin-left: 20rpx;
		}
	}
}
</style>

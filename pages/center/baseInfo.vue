<template>
	<view class="">
		<view class="header" >
			<view class="avatar-body" @click="changePhoto">
				<u-avatar :src="'http://192.168.79.1:3000'+url" size="140"></u-avatar>
			</view>
			<view class="name">
				<view class="nickname u-line-1">{{nickname}}</view>
				<text class="tel">手机号：{{phoneNum}}</text>
			</view>
		</view>
		<view class="">
			<u-cell-group>
				<u-cell-item  title="修改uu昵称" @click="changeNickname">{{nickname}}</u-cell-item>
				<u-cell-item  title="修改手机号" @click="changePhone">{{phoneNum}}</u-cell-item>
				<u-cell-item  title="修改登录密码" @click="changePassword"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>
<script>
	import {mapState} from 'vuex';
	export default {
		computed: {
			...mapState({
				nickname: state => state.user.userInfo.nickname,
				phoneNum: state => state.user.userInfo.phoneNum,
				url: state => state.user.userInfo.url
			})
		},
		methods:{
			// 修改昵称
			changeNickname() {
				this.$u.route({
					url: "pages/center/changeNickname"
				})
			},
			// 修改手机号
			changePhone() {
				this.$u.route({
					url: "pages/center/changephone"
				})
			},
			// 修改密码
			changePassword() {
				this.$u.route({
					url: "pages/center/changepassword"
				})
			},
			// 更换头像
			changePhoto() {
				this.$u.route({
					url: "pages/center/changephoto"
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
page {
		background-color: #F5F5F5;
}
.header {
	background-color: #fff;
	padding: 40rpx;
	display: flex;
	.avatar-body {
		width: 70px;
		height: 70px;
	}
	.name {
		display: flex;
		flex-wrap: wrap;
		margin-top: 8rpx;
		margin-left: 20rpx;
		width: 340rpx;
		.nickname {
			font-size: 32rpx;
			font-weight: bold;
		}
	}
}
	
</style>
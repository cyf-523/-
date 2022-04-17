<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录uni网上商城</view>
			<view class="u-flex u-col-top">
				<!-- <image src="../../static/center.png" mode="" style="width: 40rpx;height: 40rpx;margin-top: 6rpx;"></image> -->
				<u-icon name="account" color="#bbb" size="40" style="margin-top: 5rpx;"></u-icon>
				<input class="u-border-bottom" v-model="phoneNum" placeholder="请输入手机号" />
			</view>
			<view class="u-flex u-col-top">
				<!-- <image src="../../static/center.png" mode="" style="width: 40rpx;height: 40rpx;margin-top: 6rpx;"></image> -->
				<u-icon name="lock" color="#bbb" size="40" style="margin-top: 5rpx;"></u-icon>
				<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			</view>
			<button @click="submit" :style="[inputStyle]" class="getCaptcha">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</button>
			<view class="alternative">
				<view class="password" @click="passwordLogin()">忘记密码</view>
				<view class="issue" @click="loginBy()">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNum: '',
				password: '',
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				let reg = new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z~!@#$%^&*_?]{8,16}$/)
				if (this.$u.test.mobile(this.phoneNum) && reg.test(this.password)) {
					style.color = "#fff";
					style.backgroundColor = '#FF8888';
				}
				return style;
			}
		},
		onLoad() {

		},
		methods: {
			async submit() {
				let reg = new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z~!@#$%^&*_?]{8,16}$/)
				if (!this.$u.test.mobile(this.phoneNum) || !this.password) return
				// 处理登录用的参数
				const params = {
					phoneNum: this.phoneNum,
					password: this.password
				}
				try{
					// 派发action,发送请求
					await this.$store.dispatch('userLogin',params);
					// 登录成功
					
					// 跳转到来源页
					const backUrl = uni.getStorageSync('back_url');
					this.$u.toast('登录成功')
					setTimeout(() => {
						this.$u.route({
							type: 'reLaunch',
							url: backUrl
						})
					},1500)
				}catch(e){
					//TODO handle the exception
					this.$u.toast(e)
				}
				
			},
			// 注册跳转
			loginBy(){
				this.$u.route({
					url: 'pages/auth/register'
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
.u-border-bottom {
	margin-left: 10rpx;
	margin-bottom: 50rpx !important;
}
.wrap {
	font-size: 28rpx;

	.content {
		width: 600rpx;
		margin: 0 auto;
		padding-top: 80rpx;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		.u-border-bottom {
			margin-bottom: 30rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.getCaptcha {
			background-color: #FFE4E1;
			color: $u-tips-color;
			border: none;
			font-size: 40rpx;
			padding: 8rpx 0;

			&::after {
				border: none;
			}
		}

		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
}
</style>

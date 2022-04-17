<template>
    <view class="container">
        <view class="content">
			<view class="title">手机号注册</view>
        	<u-form :model="form" ref='myForm' >
				<u-form-item label="昵称" prop="nickname" label-width="140rpx">
				    <u-input v-model="form.nickname" placeholder="请输入uu昵称"></u-input>
				</u-form-item>
        	    <u-form-item label="账号" prop="phoneNum" label-width="140rpx">
        	        <u-input v-model="form.phoneNum" placeholder="请输入手机号"></u-input>
        	    </u-form-item>
        	    <u-form-item label="密码" prop="password" label-width="140rpx">
        	        <u-input v-model="form.password" type="password" placeholder="请输入密码"></u-input>
        	    </u-form-item>
        	    <u-form-item label="确认密码" prop="password1" label-width="140rpx">
        	        <u-input v-model="form.password1" type="password" placeholder="请重复输入密码"></u-input>
        	    </u-form-item>
        	</u-form>
        	<button class="register" :style="[inputStyle]" @click="submit">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</button>
        	<view  class="alternative" @click="login()">已有账号？去登录</view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                form: {
					nickname: "",
                    phoneNum: "",
                    password: "",
                    password1: ""
                },
                rules: {
					nickname: [
						{ 
							required: true, 
							message: "请输入昵称", 
							trigger: ['change','blur'],
						},
						
					],
                    phoneNum: [
						{ required: true, message: '请输入手机号', trigger: ['change','blur'] },
						{
							// 自定义验证函数，
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						},
						// 校验用户是否已存在
						{
							asyncValidator: (rule, value, callback) => {
								const params = { phoneNum:value }
								this.$u.api.reqCheckUser(params).then(res => {
									// 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
									if(res.code == 200) {
										callback();
									} else {
										callback(new Error('该手机号已被注册！'));
									}
								})
						    }
						}
					],
                    password: [
						{ required: true, message: "请输入密码", trigger: 'change'},
						{
							// 自定义验证函数，
							validator: (rule, value, callback) => {
								// return /^\w{8,14}$/.test(value);
								return /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z~!@#$%^&*_?]{8,16}$/.test(value);
								
							},
							message: '密码长度为8到16位，包含数字、字母',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
						
					],
                    password1: [
						{ required: true, message: "请重复输入密码", trigger: "change"},
						{
							// 自定义验证函数，
							validator: (rule, value, callback) => {
								return value === this.form.password;
							},
							message: '重复密码与密码不一致',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
					]
                }
            }
        },
		computed: {
			inputStyle() {
				let style = {};
				if (this.form.nickname && this.$u.test.mobile(this.form.phoneNum) && this.form.password && this.form.password1) {
					style.color = "#fff";
					style.backgroundColor = '#FF8888';
				}
				return style;
			}
		},
        methods: {
            submit() {
                this.$refs.myForm.validate(async valid => {
                    if (valid) {
						const params = {
							nickname: this.form.nickname,
							phoneNum: this.form.phoneNum,
							password: this.form.password
						};
                        let result = await this.$u.api.reqUserRegister(params);
						if(result.code == 200) {
							// 注册成功，重定向到登录
							this.$u.toast('注册成功')
							// 重定向到登录
							setTimeout(() => {
								this.$u.route({
									type: 'redirect',
									url: 'pages/auth/login',
								})
							}, 1500)
						}
                    }
                });
            },
			// 登录跳转
			login(){
				this.$u.route({
					url: 'pages/auth/login'
				})
			},
        },
        onReady() {
            this.$refs.myForm.setRules(this.rules)
			// console.log(this.form.password)
        }
    };
</script>
<style lang="scss" scoped>
.container {
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
		u-input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.register {
			background-color: #FFE4E1;
			color: $u-tips-color;
			border: none;
			font-size: 40rpx;
			padding: 8rpx 0;
			margin-top: 40rpx;
		
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			margin-top: 30rpx;
		}
	}
	
	
	
}
</style>
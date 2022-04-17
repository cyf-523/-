<template>
	<view class="u-m-l-40 u-m-r-40">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item label="当前密码" prop="nowpassword" required label-width="140rpx">
					<u-input type="password" v-model="form.nowpassword" placeholder="请输入当前密码"/>
				</u-form-item>
				<u-form-item label="密码" prop="password" required label-width="140rpx">
					<u-input type="password" v-model="form.password" placeholder="请输入密码"/>
				</u-form-item>
				<u-form-item label="确认密码" prop="password1" required label-width="140rpx">
				    <u-input v-model="form.password1" type="password" placeholder="请重复输入密码"></u-input>
				</u-form-item>
			</u-form>
			<u-button @click="submit">保存</u-button>
	</view>
</template>
<script>
import {mapState} from 'vuex';
export default {
	data() {
		return {
			errorType: ['message'],
			form: {
				nowpassword:'',
				password: '',
				password1: ''
			},
			rules: {
				nowpassword:[
					{ required: true, message: "请输入当前密码", trigger: 'change'},
					{
						asyncValidator: (rule, value, callback) => {
							const params = { password:value }
							this.$u.api.reqCheckPassword(params).then(res => {
								// 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
								if(res.code == 200) {
									callback();
								} else {
									this.$u.toast('当前密码不正确！')
									// callback(new Error('该手机号已被注册！'));
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
							return /^\w{8,14}$/.test(value);
						},
						message: '密码是8到14位的字母数字下划线',
						// 触发器可以同时用blur和change
						trigger: ['change'],
					},
					{
						// 自定义验证函数，
						validator: (rule, value, callback) => {
							return value !== this.form.nowpassword;
						},
						message: '新密码与原密码相同',
						// 触发器可以同时用blur和change
						trigger: ['blur'],
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
		...mapState({
			name: state => state.user.userInfo.nickname
		})
	},
	methods: {
			submit() {
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						try{
							// 验证通过，发请求修改用户信息
							const params = { password: this.form.password }
							await this.$u.api.reqUpdateUserInfo(params);
							// 修改成功
							this.$u.toast('修改成功，请重新登录')
							setTimeout(() => {
								this.$u.route({
									type: 'reLaunch',
									url: 'pages/auth/login'
								})
							}, 1000)
						}catch(e){
							this.$u.toast('请登录');
						}
					} else {
						console.log('验证失败');
					}
				});
			}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
		this.form.nickname = this.name
	}
}
</script>

<style>
</style>

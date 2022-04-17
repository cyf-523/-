<template>
	<view class="u-m-l-40 u-m-r-40">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item label="手机号" prop="phoneNum" required label-width="100rpx">
					<u-input v-model="form.phoneNum" placeholder="请输入手机号"/>
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
				phoneNum: '',
			},
			rules: {
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
									this.$u.toast('该手机号已被注册！')
									// callback(new Error('该手机号已被注册！'));
								}
							})
					    }
					}
				]
				
			}
		}
	},
	computed: {
		...mapState({
			phoneNum: state => state.user.userInfo.phoneNum
		})
	},
	methods: {
			submit() {
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						try{
							// 验证通过，发请求修改用户信息
							const params = { phoneNum: this.form.phoneNum }
							let result = await this.$u.api.reqUpdateUserInfo(params);
							// 修改成功
							// 更新token
							let token = result.data.token;
							uni.setStorageSync('TOKEN', token);
							// 修改成功
							this.$store.commit('UPDATEPHONENUM', params);
							this.$u.toast('修改成功')
							setTimeout(() => {
								this.$u.route({
									type: 'back',
									url: 'pages/center/baseInfo'
								})
							}, 1000)
						}catch(e){
							this.$u.toast('请登录');
						}
					} else {
						this.$u.toast('请输入正确手机号！')
					}
				});
			}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
		this.form.phoneNum = this.phoneNum
	}
}
</script>

<style>
</style>

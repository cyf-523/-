<template>
	<view class="u-m-l-40 u-m-r-40">
			<u-form :model="form" ref="uForm" :error-type="errorType" :border-bottom="true">
				<u-form-item label="昵称" prop="nickname" required >
					<u-input v-model="form.nickname" placeholder="请输入昵称"/>
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
				nickname: '',
			},
			rules: {
				nickname: [
					{ required: true, message: '请输入昵称', trigger: ['change','blur'] }
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
							const params = { nickname: this.form.nickname }
							let result = await this.$u.api.reqUpdateUserInfo(params);
							// 修改成功
							// 更新token
							let token = result.data.token;
							uni.setStorageSync('TOKEN', token);
							// await this.$store.dispatch('updateUserInfo', params)
							this.$store.commit('UPDATENICKNAME', params);
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

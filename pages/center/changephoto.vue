<template>
	<view>
		<u-upload ref="uUpload" :action="action" :auto-upload="false"  max-count="1" @on-success="onSuccess"></u-upload>
		<u-button @click="submit">更换头像</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				// 非真实地址
				action: `/api/user/upload?token=${uni.getStorageSync('TOKEN')}`,
			}
		},
		computed: {
			...mapState({
				token: state => state.user.token
			})
		},
		methods: {
			submit() {
				this.$refs.uUpload.upload();
			},
			onSuccess(data) {
				// console.log(data)
				if(data.code == 200) {
					// 更新token
					let token = data.data.token;
					uni.setStorageSync('TOKEN', token);
					// 更新头像
					this.$store.commit('UPDATEPHOTO', data.data.url);
					// 更新成功
					// this.$u.toast('更新成功');
					this.$refs.uToast.show({title: '更新成功'})
					setTimeout(() => {
						this.$u.route({
							type: 'back',
							url: 'pages/center/baseInfo'
						})
					}, 1000)
				}
			}
		}
	}
</script>

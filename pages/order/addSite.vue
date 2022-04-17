<template>
	<view class="container">
		<u-form :model="form" ref='myForm' >
			<u-form-item label="收货人" prop="name" label-width="140rpx">
			    <u-input v-model="form.name" placeholder="名字" :border='true'></u-input>
			</u-form-item>
		    <u-form-item label="账号" prop="phone" label-width="140rpx">
		        <u-input v-model="form.phone" placeholder="手机号" :border='true'></u-input>
		    </u-form-item>
			<u-form-item label="所在地区" label-width="140rpx" prop="area">
				<city-select v-model="value" @city-change="cityChange"></city-select>
				<!-- <view class="u-demo-result-line" @click="value = true">{{ input ? input : '省、市、区' }}</view> -->
				<u-input v-model="form.area" :border='true' placeholder="省/市/区" disabled @click="value = true"></u-input>
			</u-form-item>
			<u-form-item label="详细地址" label-width="140rpx" prop="address">
				<u-input v-model="form.address" type="textarea" :border='true' :height="40" :auto-height="false" placeholder="小区楼栋/乡村名称" />
			</u-form-item>
		    <u-form-item label="设为默认收货地址" label-width="240rpx"><u-switch slot="right" v-model="switchVal" active-color="#FF8888"></u-switch></u-form-item>
		</u-form>
		<view class="btn">
			<button class="submit" @click="submit">保存</button>
			<button class="clear" @click="clear">重置</button>
		</view>
	</view>
</template>
<script>
	import citySelect from './u-city-select.vue';
	export default {
		components: {
			citySelect
		},
		data() {
			return {
				value: false,
				// input: '',
				switchVal:false,
				form: {
					name: "",
				    phone: "",
					area:'',
					address:''
				},
				rules: {
					name: [
						{ 
							required: true, 
							message: "请填写收货人", 
							trigger: ['change','blur'],
						},
						
					],
					phone: [
						{ required: true, message: '请填写正确的手机号', trigger: ['change','blur'] },
						{
							// 自定义验证函数，
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '请填写正确的手机号',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						},
					],
					area: [
						{ 
							required: true, 
							message: "请选择所在地区", 
							trigger: ['blur'],
						},
						
					],
					address: [
						{ 
							required: true, 
							message: "请填写详细地址", 
							trigger: ['change','blur'],
						},
						
					],
				}
			}
		},
		methods: {
			cityChange(e) {
				this.form.area = e.province.label + ' ' + e.city.label + ' ' + e.area.label;
			},
			submit() {
			    this.$refs.myForm.validate(async valid => {
			        if (valid) {
						try{
							const params = {
								name: this.form.name,
								phone: this.form.phone,
								area:this.form.area,
								address:this.form.address,
								isDefault:this.switchVal
							};
							params.id = Date.now()
							await this.$store.dispatch('addAddress', params)
							// 添加成功
							this.$u.route({
								url:'pages/order/address',
								type:'redirect'
							})
						}catch(e){
							this.$u.toast(e)
						}
					}
				})
			},
			clear() {
				this.$refs.myForm.resetFields()
			}
		},
		onReady() {
		    this.$refs.myForm.setRules(this.rules)
		}
	}
</script>
<style lang="scss" scoped>
.container {
		width: 700rpx;
		margin: 0 auto;	
		.btn {
			display: flex;
			.submit {
				background-color: #FF8888;
				color: #FFFFFF;
				font-size: 34rpx;
				margin-top: 40rpx;
				width: 220rpx;
				border-radius: 50rpx;
			}
			.clear {
				background-color: #FFFFFF;
				color: #FF8888;
				border:1px solid #FF8888;
				font-size: 34rpx;
				margin-top: 40rpx;
				width: 220rpx;
				border-radius: 50rpx;
			}
		}
}
</style>
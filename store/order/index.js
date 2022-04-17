import Vue from "vue";
let vm = new Vue();
const state = {
	addressList:[],
	// 预览订单
	preViewOrder:{},
	// 订单
	orderList:[],
	// 订单详情
	orderDetail:{}
};
const mutations = {
	// 地址列表
	GETADDRESS(state, addressList) {
		state.addressList = addressList
	},
	// 预览订单
	PREVIEWORDER(state, preViewOrder) {
		state.preViewOrder = preViewOrder
	},
	// 获取订单列表
	GETORDERLIST(state, orderList) {
		state.orderList = orderList;
	},
	// 订单详情
	GETORDERDETAIL(state,orderDetail) {
		state.orderDetail = orderDetail;
	}
};
const actions = {
	async addAddress({commit}, params) {
		let result = await vm.$u.api.reqAddAddress(params);
		// console.log(result)
		if(result.code == 200) {
			return 'ok';
		}else {
			return Promise.reject(new Error('fail'))
		}
	},
	// 获取地址
	async getAddress({commit}) {
		let result = await vm.$u.api.reqGetAddress();
		// console.log(result)
		if(result.code == 200) {
			commit('GETADDRESS', result.data)
			return 'ok';
		}else {
			return Promise.reject(new Error('fail'))
		}
	},
	// 修改地址
	async deleteAddress({commit}, params) {
		let result = await vm.$u.api.reqDeleteAddress(params);
		// console.log(result);
		if(result.code == 200) {
			return 'ok';
		}else {
			return Promise.reject(new Error('fail'))
		}
	},
	// 订单预览
	async preViewOrder({commit}, params) {
		let result = await vm.$u.api.reqPreViewOrder(params);
		console.log(result);
		if(result.code == 200) {
			commit('PREVIEWORDER', result.data)
			return 'ok';
		}else {
			return Promise.reject(new Error('fail'))
		}
	},
	// 获取订单列表
	async getOrderList({commit}, params) {
		let result = await vm.$u.api.reqGetOrderList(params);
		// console.log(result);
		if(result.code == 200) {
			commit('GETORDERLIST',result.data);
			return 'ok';
		}else {
			return Promise.reject(new Error('fail'))
		}
	},
	// 获取订单详情
	async getOrderDetail({commit}, params) {
		let result = await vm.$u.api.reqGetOrderDetail(params);
		if(result.code == 200) {
			commit('GETORDERDETAIL',result.data);
			return 'ok';
		}else {
			return Promise.reject(new Error('fail'))
		}
	},
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
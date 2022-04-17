import Vue from "vue";
let vm = new Vue();
const state = {
	cartList:[]
};
const mutations = {
	// 加入购物车
	ADDSHOPCART(state, cartList) {
		state.cartList = cartList
	}
};
const actions = {
	// 加入购物车
	async addShopCart({commit}, params) {
		let result = await vm.$u.api.reqAddShopcart(params);
		if(result.code == 200) {
			return 'ok'
		}else {
			return Promise.reject(new Error('fail'))
		}
	},
	async getCartList({commit}) {
		let result = await vm.$u.api.reqGetCartList();
		if(result.code == 200) {
			commit('ADDSHOPCART', result.data);
			return 'ok'
		}else {
			return Promise.reject(new Error('fail'))
		}
	},
	// 改变商品数量
	async changeSkuNum({commit}, params) {
		let result = await vm.$u.api.reqChangeNum(params);
		console.log(result)
		if(result.code == 200) {
			// commit('ADDSHOPCART', result.data);
			return 'ok'
		}else {
			return Promise.reject(new Error('fail'))
		}	
	},
	// 删除商品
	async deleteCart({commit}, params) {
		let result = await vm.$u.api.reqDeleteCart(params);
		// console.log(result)
		if(result.code == 200) {
			// commit('ADDSHOPCART', result.data);
			return 'ok'
		}else {
			return Promise.reject(new Error('fail'))
		}	
	},
	// 修改商品选中状态
	async changeChecked({commit}, params) {
		let result = await vm.$u.api.reqChangeChecked(params); 
		if(result.code == 200) {
			commit('ADDSHOPCART', result.data);
			return 'ok'
		}else {
			return Promise.reject(new Error('fail'))
		}
	},
	// 全选
	async isAllChecked({dispatch,state}, isChecked) {
		let promiseAll = [];
		state.cartList.forEach(item => {
			let promise = dispatch('changeChecked', {skuId:item._id, isChecked});
			promiseAll.push(promise);
		})
		return Promise.all(promiseAll)
	}
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
import Vue from "vue";
let vm = new Vue();
const state = {
	categoryList:[]
};
const mutations = {
	// 存储分类列表
	GETCATEGORY(state, categoryList) {
		state.categoryList = categoryList;
	}
};
const actions = {
	// 获取商品分类
	async getCategory({commit}) {
		let result = await vm.$u.api.reqCategory()
		// console.log(result);
		if(result.code == 200) {
			commit('GETCATEGORY', result.data);
			return 'ok'
		}else {
			return Promise.reject(new Error('fail'))
		}
	}
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
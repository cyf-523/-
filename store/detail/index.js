import Vue from "vue";
let vm = new Vue();
const state = {
	productDetail: {},
	swiperList:[],
	skuInfo: {},
	spuSaleAttrList:[],
	comments:[],
	pics:[],
	like_goods:{}
};
const mutations = {
	// 存储详情页信息
	GETPRODUCTDETAIL(state, data) {
		state.productDetail = data;
		state.swiperList = data.swiperList;
		state.skuInfo = data.skuInfo;
		state.spuSaleAttrList = data.spuSaleAttrList;
		state.comments = data.comments;
		state.pics = data.pics;
		state.like_goods = data.like_goods
	}
};
const actions = {
	// 获取商品详情
	async getProductDetial({commit}, params) {
		let result = await vm.$u.api.reqProductDetail(params);
		// console.log(result)
		if(result.code == 200) {
			commit('GETPRODUCTDETAIL', result.data)
			
			return 'ok'
		}else {
			return Promise.reject(new Error('fail'))
		}
	},
	// 商品收藏
	async collectProduct({commit}, params) {
		let result = await vm.$u.api.reqIsCollect(params);
		if(result.code == 200) {
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
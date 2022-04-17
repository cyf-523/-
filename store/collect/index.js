import Vue from "vue";
let vm = new Vue();
const state = {
	collectList:[]
};
const mutations = {
	GETMYCOLLECT(state, collectList) {
		state.collectList = collectList
	}
};
const actions = {
	async getMycollect({commit}) {
		let result = await vm.$u.api.reqGetMycollect();
		// console.log(result);
		if(result.code == 200) {
			commit('GETMYCOLLECT', result.data)
			return 'ok'
		}else {
			return Promise.reject(result.msg)
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
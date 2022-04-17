import Vue from "vue";
let vm = new Vue();
const state = {
	token: uni.getStorageSync('TOKEN'),
	userInfo: {}
};
const mutations = {
	// 存储token
	USERLOGIN(state, token) {
		state.token = token;
	},
	// 存储用户信息
	GETUSERINFO(state, userInfo) {
		state.userInfo = userInfo
	},
	// 更新用户信息
	UPDATENICKNAME(state, nickname) {
		state.userInfo.nickname = nickname.nickname
	},
	UPDATEPHONENUM(state, phoneNum) {
		state.userInfo.phoneNum = phoneNum.phoneNum
	},
	UPDATEPHOTO(state, url) {
		state.userInfo.url = url
	},
	// 删除token和用户信息
	DELETETOKEN(state) {
		state.token = ''
		state.userInfo = {};
		uni.removeStorageSync('TOKEN');
	}
};
const actions = {
	// 用户登录
	async userLogin({commit}, params) {
		let result = await vm.$u.api.reqUserLogin(params);
		if(result.code == 200) {
			commit('USERLOGIN', result.data.token);
			// 持久化存储token
			// localStorage.setItem("TOKEN", result.data.token);
			uni.setStorageSync("TOKEN", result.data.token)
			return 'ok'
		}else {
			return Promise.reject(result.msg)
		}
	},
	// 获取用户信息
	async getUserInfo({commit}) {
		let result = await vm.$u.api.reqUserInfo()
		// console.log(result)
		if(result.code == 200) {
			commit('GETUSERINFO', result.data);
			return 'ok'
		}else {
			return Promise.reject(result.msg)
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
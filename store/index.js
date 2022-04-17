import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 引入小仓库

import detail from './detail';
import shopcart from './shopcart';
import user from './user';
import category from './category/index.js';

import collect from './collect/index.js';
import order from './order/index.js';

export default new Vuex.Store({
    modules: {
        detail,
        shopcart,
        user,
		category,
		collect,
		order
    }

})
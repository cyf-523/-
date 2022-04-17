const install = (Vue, vm) => {
	vm.$u.api = {}
	// 首页
	vm.$u.api.reqGetProductList = (params = {}) => vm.$u.get('http://192.168.79.1:3000/data/home', params);
	// #ifdef H5
	vm.$u.api.reqGetProductList = (params = {}) => vm.$u.get('/api/data/home', params);
	// #endif
	// // #ifdef MP-WEIXIN
	// vm.$u.api.reqGetProductList = (params = {}) => vm.$u.get('http://192.168.79.1:3000/data/home', params);
	// // #endif
	
	// 注册
	vm.$u.api.reqUserRegister = (params = {}) => vm.$u.post('http://192.168.79.1:3000/user/register', params);
	// #ifdef H5
	vm.$u.api.reqUserRegister = (params = {}) => vm.$u.post('/api/user/register', params);
	// #endif
	// 检验用户是否存在
	vm.$u.api.reqCheckUser = (params = {}) => vm.$u.get('http://192.168.79.1:3000/user/checkuser', params);
	// #ifdef H5
	vm.$u.api.reqCheckUser = (params = {}) => vm.$u.get('/api/user/checkuser', params);
	// #endif
	// 登录
	vm.$u.api.reqUserLogin = (params = {}) => vm.$u.post('http://192.168.79.1:3000/user/login',params);
	// #ifdef H5
	vm.$u.api.reqUserLogin = (params = {}) => vm.$u.post('/api/user/login',params);
	// #endif
	// 请求用户信息
	vm.$u.api.reqUserInfo = () => vm.$u.get('http://192.168.79.1:3000/user/userinfo');
	// #ifdef H5
	vm.$u.api.reqUserInfo = () => vm.$u.get('/api/user/userinfo');
	// #endif
	// 修改密码时验证当前密码
	vm.$u.api.reqCheckPassword  = (params = {}) => vm.$u.get('http://192.168.79.1:3000/user/checkpassword', params);
	// #ifdef H5
	vm.$u.api.reqCheckPassword  = (params = {}) => vm.$u.get('/api/user/checkpassword', params);
	// #endif
	// 修改用户信息
	vm.$u.api.reqUpdateUserInfo = (params = {}) => vm.$u.post('http://192.168.79.1:3000/user/updateuserinfo', params);
	// #ifdef H5
	vm.$u.api.reqUpdateUserInfo = (params = {}) => vm.$u.post('/api/user/updateuserinfo', params);
	// #endif
	
	// 获取商品详情
	vm.$u.api.reqProductDetail = (params = {}) => vm.$u.get('http://192.168.79.1:3000/data/product/detail', params);
	// #ifdef H5
	vm.$u.api.reqProductDetail = (params = {}) => vm.$u.get('/api/data/product/detail', params);
	// #endif
	// 收藏和取消收藏
	vm.$u.api.reqIsCollect = (params = {}) => vm.$u.get(`http://192.168.79.1:3000/collects/goods`, params);
	// #ifdef H5
	vm.$u.api.reqIsCollect = (params = {}) => vm.$u.get(`/api/collects/goods`, params);
	// #endif
	// 获取我的收藏
	vm.$u.api.reqGetMycollect = () => vm.$u.get(`http://192.168.79.1:3000/collects/getcollect`);
	// #ifdef H5
	vm.$u.api.reqGetMycollect = () => vm.$u.get(`/api/collects/getcollect`);
	// #endif
	// 加入购物车
	vm.$u.api.reqAddShopcart = (params = {}) => vm.$u.post(`http://192.168.79.1:3000/carts`, params);
	// #ifdef H5
	vm.$u.api.reqAddShopcart = (params = {}) => vm.$u.post(`/api/carts`, params);
	// #endif
	// 获取购物车列表
	vm.$u.api.reqGetCartList = () => vm.$u.get('http://192.168.79.1:3000/carts/cartlist');
	// #ifdef H5
	vm.$u.api.reqGetCartList = () => vm.$u.get('/api/carts/cartlist');
	// #endif
	// 改变商品数量
	vm.$u.api.reqChangeNum = (params = {}) => vm.$u.post(`http://192.168.79.1:3000/carts/changenum`, params);
	// #ifdef H5
	vm.$u.api.reqChangeNum = (params = {}) => vm.$u.post(`/api/carts/changenum`, params);
	// #endif
	// 删除购物车商品
	vm.$u.api.reqDeleteCart = (params = {}) => vm.$u.get(`http://192.168.79.1:3000/carts/deletecart`, params);
	// #ifdef H5
	vm.$u.api.reqDeleteCart = (params = {}) => vm.$u.get(`/api/carts/deletecart`, params);
	// #endif
	// 修改商品勾选状态
	vm.$u.api.reqChangeChecked = (params = {}) => vm.$u.get(`http://192.168.79.1:3000/carts/changechecked`, params);
	// #ifdef H5
	vm.$u.api.reqChangeChecked = (params = {}) => vm.$u.get(`/api/carts/changechecked`, params);
	// #endif
	// 获取商品分类
	vm.$u.api.reqCategory = () => vm.$u.get(`http://192.168.79.1:3000/product/getcategory`);
	// #ifdef H5
	vm.$u.api.reqCategory = () => vm.$u.get(`/api/product/getcategory`);
	// #endif
	// 获取商品列表
	vm.$u.api.reqProductList = (params = {}) => vm.$u.post(`http://192.168.79.1:3000/data/product`, params);
	// #ifdef H5
	vm.$u.api.reqProductList = (params = {}) => vm.$u.post(`/api/data/product`, params);
	// #endif
	// 商品排序
	// vm.$u.api.reqSortProduct = (params = {}) => vm.$u.post(`/api/data/product/sort`, params);
	// 商品搜索
	vm.$u.api.reqSearchProduct = (params = {}) => vm.$u.post(`http://192.168.79.1:3000/data/product/search`, params);
	// #ifdef H5
	vm.$u.api.reqSearchProduct = (params = {}) => vm.$u.post(`/api/data/product/search`, params);
	// #endif
	
	// 添加收货地址
	vm.$u.api.reqAddAddress = (params = {}) => vm.$u.post(`http://192.168.79.1:3000/address`, params);
	// #ifdef H5
	vm.$u.api.reqAddAddress = (params = {}) => vm.$u.post(`/api/address`, params);
	// #endif
	// 获取收货地址
	vm.$u.api.reqGetAddress = () => vm.$u.get(`http://192.168.79.1:3000/address/getaddress`);
	// #ifdef H5
	vm.$u.api.reqGetAddress = () => vm.$u.get(`/api/address/getaddress`);
	// #endif
	// 修改收货地址
	vm.$u.api.reqDeleteAddress =  (params = {}) => vm.$u.get(`http://192.168.79.1:3000/address/deleteaddress`, params);
	// #ifdef H5
	vm.$u.api.reqDeleteAddress =  (params = {}) => vm.$u.get(`/api/address/deleteaddress`, params);
	// #endif
	// 订单预览
	vm.$u.api.reqPreViewOrder = (params = {}) => vm.$u.get(`http://192.168.79.1:3000/order/previeworder`, params);
	// #ifdef H5
	vm.$u.api.reqPreViewOrder = (params = {}) => vm.$u.get(`/api/order/previeworder`, params);
	// #endif
	
	// 支付
	vm.$u.api.reqPay = (params = {}) => vm.$u.post(`http://192.168.79.1:3000/pay`, params);
	// #ifdef H5
	vm.$u.api.reqPay = (params = {}) => vm.$u.post(`/api/pay`, params);
	// #endif
	// 获取订单列表
	vm.$u.api.reqGetOrderList = (params = {}) => vm.$u.get(`http://192.168.79.1:3000/order/getorder`, params);
	// #ifdef H5
	vm.$u.api.reqGetOrderList = (params = {}) => vm.$u.get(`/api/order/getorder`, params);
	// #endif
	// 获取订单详情
	vm.$u.api.reqGetOrderDetail = (params = {}) => vm.$u.get(`http://192.168.79.1:3000/order/getorderdetail`, params);
	// #ifdef H5
	vm.$u.api.reqGetOrderDetail = (params = {}) => vm.$u.get(`/api/order/getorderdetail`, params);
	// #endif
	// 提醒商家发货
	vm.$u.api.reqRemind = (params = {}) => vm.$u.get(`http://192.168.79.1:3000/order/remind`, params);
	// #ifdef H5
	vm.$u.api.reqRemind = (params = {}) => vm.$u.get(`/api/order/remind`, params);
	// #endif
}

export default {
	install
}
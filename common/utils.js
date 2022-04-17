
const install = (Vue, vm) => {
	// 是否登录
	const isLogin = () => {
		// 获取登录
		const token = vm.$store.state.user.token;
		// console.log(token)
		if(!token) {
			// 来自哪个页面
			const currentPage = getCurrentPages().pop();
			
			// 获取页面路径和请求参数
			const { options, route } = currentPage;
			// 获取所有参数的key
			const optionsKeys = Object.keys(options)
			let params = '';
			if (optionsKeys.length !== 0) {
				params = optionsKeys.reduce((pre, current) => {
					return `${pre}${current}=${options[current]}&`
				}, '?').slice(0, -1)
			}
			
			// 缓存当前页，用于登录之后跳转
			uni.setStorageSync('back_url', route + params)
			vm.$u.toast('请登录')
			setTimeout(() => {
				vm.$u.route({
					type: 'redirect',
					url:'pages/auth/login'
				})
			}, 1500)
			return false
		}
		return true
	}
	vm.$u.utils = {
		isLogin
	}
}
export default {
	install
}
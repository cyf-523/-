module.exports = {
	// 配置路径别名
	configureWebpack: {
		devServer: {
			disableHostCheck: true,
			// 代理跨域
			proxy: {
			    '/api': {
			        target: 'http://192.168.79.1:3000',
					"changeOrigin": true,//是否跨域
					"secure": false,// 设置支持https协议的代理
					"pathRewrite":{"^/api":"/"}
			    }
			}
	    }
	}
}

module.exports = {
  //相当于webpack-dev-server,  对本地服务器进行配置
  // 服务项配置    
  devServer: {
    // 设置代理proxy
    proxy: {
      '/shareplat': {
        'target': 'https://test.uxunbank.com:9443',
        changeOrigin: true, //表示是否跨域
      },
      '/act': {
        'target': 'https://test.jifenyi.com:9888/mplat/',
        changeOrigin: true, //表示是否跨域
      }
    }
  }
}
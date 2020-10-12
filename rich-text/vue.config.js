const CopyPlugin = require("copy-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
  //=>process.env.NODE_ENV：环境变量中存储的是开发环境还是生产环境
  publicPath: './',
  //=>outputDir
  //=>自定义目录名称，把生成的JS/CSS/图片等静态资源放置到这个目录中
  // assetsDir: "assets",
  //=>关闭生产环境下的资源映射（生产环境下不在创建xxx.js.map文件）
  productionSourceMap: false,
  //=>设置一些webpack配置项，用这些配置项和默认的配置项合并
  configureWebpack: {
    plugins: [
      new CopyPlugin([{
          from: "src/index.json",
        },
        {
          from: "src/index.jpg",
        },
        {
          from: "src/index_mini.jpg",
        },
      ]),
      new FileManagerPlugin({
        onEnd: {
          mkdir: ["./zip"],
          archive: [{
            source: "./dist",
            destination: "./zip/富文本模板.zip"
          }, ],
        },
      }),
    ],
  },
  chainWebpack: config => {
    // =>config:原始配置信息对象
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '富文本'
        return args
      })
  },
  //相当于webpack-dev-server,  对本地服务器进行配置
  // 服务项配置
  devServer: {
    // 设置代理proxy
    proxy: {
      "/shareplat": {
        target: "https://test.jifenyi.com:9888/",
        changeOrigin: true, //表示是否跨域
      },
      "/mplat": {
        target: "https://test.jifenyi.com:9888/",
        changeOrigin: true, //表示是否跨域
      },
    },
  },
};
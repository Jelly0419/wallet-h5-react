// merge，合并两个或多个webpack配置文件
const { merge } = require('webpack-merge')

// 导入公共配置文件
const webpackConfigBase = require('./webpack.config.base')

// dev环境下相关配置
module.exports = merge(webpackConfigBase, {
  // 指定环境
  mode: 'development',
  // 输出source-map的方式，增加调试。eval是默认推荐的选择，build fast and rebuild fast！
  devtool: 'eval',
  // 本地服务器配置
  devServer: {
    // 启动GZIP压缩
    compress: true,
    // 设置端口号
    port: 3003,
    host: '0.0.0.0'
  }
})

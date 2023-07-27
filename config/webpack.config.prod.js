const { merge } = require('webpack-merge')
const webpackConfigBase = require('./webpack.config.base')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = merge(webpackConfigBase, {
  // 指定打包环境
  mode: 'production',
  optimization: {
    // css压缩
    minimizer: [new CssMinimizerPlugin()]
  },
  performance: {
    hints: false
  }
})

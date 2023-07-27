const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProd = process.env.NODE_ENV === 'prod'
/**
 * @method resolve
 * @description 从根路径开始查找文件
 */
const resolve = targetPath => {
  return path.resolve(__dirname, '..', targetPath)
}
module.exports = {
  target: 'web',
  // 入口文件
  entry: {
    main: resolve('./src/index.js')
  },
  // 输出
  output: {
    // 文件名称
    filename: 'static/js/[name].[contenthash].js',
    // 输出目录
    path: resolve('./wallet'),
    // 每次编译输出的时候，清空dist目录 - 这里就不需要clean-webpack-plugin了
    clean: true,
    // 所有URL访问的前缀路径
    publicPath: process.env.NODE_ENV === 'prod' ? './' : '/',
    // 指定asset或asset/resource类型文件存储时的命名规则
    // 注意这里设置的是所有的公共的命名处理逻辑
    assetModuleFilename: 'static/media/[hash][ext][query]'
  },
  resolve: {
    // 定义了扩展名之后，在import文件时就可以不用写后缀名了，会按循序依次查找
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
    // 设置链接
    alias: {
      // 注意resolve方法开始的查找的路径是/
      '@': resolve('./src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      // HTML模板文件
      template: resolve('./public/index.html'),
      // 收藏夹图标
      favicon: resolve('./public/favicon.ico')
    }),
    new MiniCssExtractPlugin({
      // 输出的每个css文件名称
      filename: isProd ? 'static/css/[name].[contenthash].css' : 'static/css/[name].css',
      // 非入口的chunk文件名 - 通过import()加载异步组件中样式
      chunkFilename: isProd ? 'static/css/[id].[contenthash].css' : 'static/css/[id].css'
    })
  ],
  module: {
    rules: [
      {
        // 匹配js/jsx
        test: /\.jsx?$/,
        // 排除node_modules
        exclude: /node_modules/,
        use: {
          // 确定使用的loader
          loader: 'babel-loader',
          // 参数配置
          options: {
            presets: [
              [
                // 预设polyfill
                '@babel/preset-env',
                {
                  // polyfill 只加载使用的部分
                  useBuiltIns: 'usage',
                  // 使用corejs解析，模块化
                  corejs: '3',
                  targets: {
                    chrome: '49',
                    ios: '10'
                  }
                }
              ],
              // 解析react
              '@babel/preset-react'
            ],
            // 使用transform-runtime，避免全局污染，注入helper
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          // 生产环境下直接分离打包css
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader'
          },
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // Necessary for external CSS imports to work
                // https://github.com/facebook/create-react-app/issues/2677
                ident: 'postcss',
                config: false,
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009'
                      },
                      stage: 3
                    }
                  ],
                  [
                    'postcss-pxtorem',
                    {
                      rootValue: 37.5, //设计图最大宽度除以10  //比如750的宽就写成75  我这边是1125的宽
                      selectorBlackList: [],
                      propList: ['*']
                      // exclude: /node_modules/i
                    }
                  ],
                  // Adds PostCSS Normalize as the reset css with default options,
                  // so that it honors browserslist config in package.json
                  // which in turn let's users customize the target behavior as per their needs.
                  'postcss-normalize'
                ]
              }
            }
          }
        ]
      },
      {
        // 匹配图片文件
        test: /\.(png|jpg|jpeg|gif)$/i,
        // 设置资源处理的类型为asset
        type: 'asset',
        parser: {
          // 转为inline dataUrl的条件
          dataUrlCondition: {
            // 默认限制为8kb，现在调整限制为10kb，大文件直接作为asset/resource类型文件输出
            maxSize: 10 * 1024
          }
        }
      },
      {
        // 匹配json文件
        test: /\.json$/,
        // 将json文件视为文件类型
        type: 'asset/resource',
        // 路径中包含animations的
        include: /animations/,
        generator: {
          // 这里专门针对json文件的处理
          filename: 'static/[name].[hash][ext][query]'
        }
      }
    ]
  }
}

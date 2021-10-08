const path = require('path')
const chalk = require("chalk");
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  mode: "development",
  entry: {
    index: ['webpack-hot-middleware/client', './src/index.js']
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true // 每一个构建之后都需要清楚之前的构建包
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        // css-loader: 会对@import 和 url()进行处理
        // style-loader: 将css注入到Js中， 通过DOM操作控制css
        // sass-loader 处理sass样式文件的预处理器
        use: ["style-loader", "css-loader", "sass-loader", {
          loader: "postcss-loader",
          options: {
              postcssOptions: {
                  plugins: [
                      "autoprefixer",
                  ],
              },
          },
        }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        // file-loader: 将文件输出到指定的目录
        // url-loader： 将文件转为base64内联到bundle中，如果超出限制大小，则使用file-loader将文件移动到输出文件目录中
        loader: "url-loader",
        type: 'javascript/auto', // 可以解决资源重复的问题，
        options: {
          limit: 1,
          name: "static/img/[name].[hash:7].[ext]"
        }
      }
    ]
  },

  plugins: [
    // 自定义生成html模版的内容
    new HtmlWebpackPlugin({
      title: "webpackDemo", // 模版的标题
      template: './src/index.html' // 模版的路径
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    })
  ]

}
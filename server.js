/*
 * @Author: wangshicheng
 * @Date: 2021-09-19 12:43:35
 * @Description: 
 * @FilePath: /webpack5-template/server.js
 */
const express = require('express')
const webpack = require("webpack")
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')


const compiler = webpack(webpackConfig)

const app = express()


/// 只使用这个devMiddleware这个中间件目前只能将webpack打包编译后的结果已node服务的形式提供给web页面
// 还只能在文件修改之后自动编译，需要手动刷新页面才能获取最新的内容
// 既没有实现热更新，也没有模块的替换
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}))


// 实现热更新【本地代码修改，浏览器端自动根据变换模块替换组件实现局部刷新，不改变之前的状态】
app.use(webpackHotMiddleware(compiler))

app.use(express.static( webpackConfig.output.path))

const port  = 8080
app.listen(port, () => {
  console.log(`server start at http://localhost:${port}`)
})
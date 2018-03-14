
/**
 * Created by Administrator on 2017/12/29 0029.
 */
const Webpack = require('webpack')
const config = require('./webpack.base')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

config.devtool = 'source-map'
config.plugins.push(new UglifyJsPlugin({
    sourceMap: true
}))
config.target = 'electron-renderer'

module.exports = config
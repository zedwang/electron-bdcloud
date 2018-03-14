/**
 * Created by Administrator on 2017/12/29 0029.
 */
require('@babel/register')
const Webpack = require('webpack')
const config  = require('../config')
const baseConf = require('./webpack.base')

const paths = config.get('utils.paths')

module.exports = {
    entry: [
        '@babel/polyfill',
        `${paths.src()}/index.js`,
    ],
    ...baseConf,
   
    devtool: 'inline-source-map',
    plugins: [
        ...baseConf.plugins,
        new Webpack.HotModuleReplacementPlugin()
    ],
    // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
    target: 'electron-renderer'
}
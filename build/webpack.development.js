/**
 * Created by Administrator on 2017/12/29 0029.
 */
const Webpack = require('webpack');
const config  = require('./config');
const baseConf = require('./webpack.base');

const paths = config.get('utils.paths');

module.exports = Object.assign(baseConf,{
  entry: [
    '@babel/polyfill',
    `${paths.src()}/index.js`,
  ],
  output: {
    filename: '[name].boundle.js',
    path: paths.dist()
  },
  devtool: 'inline-source-map',
  plugins: [
    ...baseConf.plugins,
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: true
    })
  ],
  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
});

/**
 * Created by Administrator on 2017/12/29 0029.
 */
const Webpack = require('webpack');
const config  = require('./config');
const base = require('./webpack.base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = config.get('utils.paths');
module.exports = Object.assign(base,{
  entry: [
    `${paths.src()}/index.js`,
  ],
  output:{
    path: paths.project(paths.dist(),'dist'),
    filename: 'app.boundle.js'
  },
  plugins: [
    new Webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
    }),
    new CopyWebpackPlugin([
      {
        from: 'resource/*',
        to: '../'
      }
    ]),
    ...base.plugins,
    new UglifyJsPlugin({
      sourceMap: false
    })
       
  ],
  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
});
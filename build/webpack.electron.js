
/**
 * Created by Administrator on 2017/12/29 0029.
 */
const Webpack = require('webpack');
const config  = require('./config');
const base = require('./webpack.base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const paths = config.get('utils.paths');
module.exports = Object.assign(base,{
  entry: [
    '@babel/polyfill',
    `${paths.project()}/main.js`,
  ],
  output: {
    filename: '[name].js',
    path: paths.dist()
  },
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    new Webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
    }),
    new UglifyJsPlugin({
      sourceMap: false
    })
  ],
  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-main'
});

console.log('+compile electron main.js on '+ process.env.NODE_ENV);
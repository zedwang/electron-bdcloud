/**
 * Setup and run the development server for Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 * @flow
 */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require('http-proxy-middleware');
const config = require('./build/config');
const webpackConfig = require('./webpack.config');

const app = new express();
const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    contentBase: webpackConfig.output.path,
    publicPath: config.get('webpack.public.path'),
    stats: {
      colors: true
    },
  })
);
app.use(webpackHotMiddleware(compiler));

app.use('/', proxy({target: 'http://localhost:10527', changeOrigin: true}));

app.listen(config.get('webpack.port'), config.get('webpack.host'), err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Server is running with port ${config.get('webpack.port')} 👏`);
});
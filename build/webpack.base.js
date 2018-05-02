/**
 * Created by Administrator on 2017/12/29 0029.
 */
const config = require('./config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = config.get('utils.paths');
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-es2015'],
            plugins: [
              require('@babel/plugin-proposal-decorators'),
              [require('@babel/plugin-proposal-class-properties'),{loose: true}],
              require('@babel/plugin-proposal-export-default-from'),
              require('@babel/plugin-proposal-object-rest-spread')
            ],
            env: {
              'development': {
                'presets': [
                  ['@babel/preset-react', { 'development': true }]
                ]
              }  
            }
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          // 'autoprefixer?browsers=last 2 version',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  // sassLoader : {
  //     includePaths : paths.src('styles')
  //   },
  plugins: [
    new CleanWebpackPlugin('dist',{
      root: paths.dist()
    }),
    new HtmlWebpackPlugin({
      title:'electron-cloud',
      template : paths.project(paths.src(),'index.html'),
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
       
  },
};
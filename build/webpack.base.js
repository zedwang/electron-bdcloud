/**
 * Created by Administrator on 2017/12/29 0029.
 */
const path = require('path')
const Webpack = require('webpack')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const paths = config.get('utils.paths')
module.exports = {

    output: {
        filename: '[name].boundle.js',
        path: paths.dist()
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: [
                            require("@babel/plugin-proposal-class-properties"),
                            require("@babel/plugin-proposal-decorators"),
                            require("@babel/plugin-proposal-export-default-from"),
                            require("@babel/plugin-proposal-object-rest-spread")
                            ],
                        env: {
                            "development": {
                                "presets": [
                                    ["@babel/preset-react", { "development": true }]
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
                test: /\.(png|svg|jpg|gif)$/,
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
        // new CleanWebpackPlugin(config.get('dir.dist')),
        new HtmlWebpackPlugin({
            title:'webpack output management',
            templateContent : '<div id="root"></div>',
            inject: 'body'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        // alias: {
        //     ui: path.join(config.client, 'js/ui/'),
        //     utils: path.join(config.client, 'js/utils/'),
        //     components: path.join(config.client, 'js/components/'),
        //     stores: path.join(config.client, 'js/stores/'),
        // },
    },
}
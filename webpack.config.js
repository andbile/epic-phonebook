const path = require('path');
//const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

// TODO eslint

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    entry: {
        main:
            [
                '@babel/polyfill',
                path.resolve(__dirname, 'frontend/js/index'),
                path.resolve(__dirname, 'frontend/styles/main.scss')
            ]
    },

    output: {
        path: path.resolve(__dirname, 'app/static'),
        filename: "js/bundle.js"
    },

    devtool: isDev ? "source-map" : false,


    devServer: {
        contentBase: path.resolve(__dirname, 'frontend'),
        hot: isDev,

        proxy:{
            path: '/',
            target: 'http://127.0.0.1:3000',
            secure: false,
        }
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "frontend/styles"),
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDev,
                            url: false
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDev,
                        },
                    },
                ]
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }

        ]
    },

    plugins: [
        //new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/style.bundle.css",
        }),
       /* new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'frontend/img/'), to: path.resolve(__dirname, 'app/frontend/img')},
                {from: path.resolve(__dirname, 'frontend/fonts/'), to: path.resolve(__dirname, 'app/frontend/fonts')},
            ],
        }),*/
        //new ESLintPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};

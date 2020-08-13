const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contentHash].js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: './src/template.html',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: '[name].[contentHash].css'})
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // 3. inject into <style> tag
                    'css-loader', // 2. css to js
                    'sass-loader' // 1. scss to css
                ]
            }
        ]
    }
});
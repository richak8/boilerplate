const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // 3. inject into <style> tag
                    'css-loader', // 2. css to js
                    'sass-loader' // 1. scss to css
                ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/template.html'
    })]
});
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = {};
const sourcePath = path.resolve(__dirname, '../src/business');
const buildDirs = fs.readdirSync(sourcePath);
buildDirs.forEach(dirName => {
    entry[dirName] = path.resolve(sourcePath, `${dirName}/index.ts`)
})

module.exports = {
    mode: 'development',
    entry,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    devServer: {
        host: 'localhost',
        hot: true,
        port: 9000,
        open: 'Google Chrome'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less?$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            business: path.resolve(__dirname, '../src/business'),
            components: path.resolve(__dirname, '../src/components')
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body'
        })
    ]
}
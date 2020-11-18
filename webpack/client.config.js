const { resolve } = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./common.config')

module.exports = merge(common, {
  mode: 'development',

  entry: {
    bundle: resolve(__dirname, '../app/client/index.js')
  },

  output: {
    path: resolve(__dirname, '../.build'),
    filename: 'client.js'
  },

  devtool: 'inline-source-map',

  devServer: {
    host: 'localhost',
    port: 4000,
    historyApiFallback: true,
    contentBase: resolve(__dirname, '../.build'),
    open: true,
    compress: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },

  target: 'web',

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, '../assets'),
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store']
          }
        }
      ]
    }),
    () => ({
      'postcss-preset-env': {
        browsers: 'last 2 versions'
      }
    }),
    new HtmlWebpackPlugin({
      title: 'React Starter Kit',
      template: resolve(__dirname, '../app/client/template.html'),
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})

const { resolve } = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./common.config')

module.exports = merge(commonConfig, {
  mode: 'development',

  output: {
    filename: '[name].js'
  },

  devtool: 'inline-source-map',

  devServer: {
    host: 'localhost',
    port: 4000,
    historyApiFallback: true,
    contentBase: resolve(__dirname, '../../.build'),
    open: true,
    compress: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
})

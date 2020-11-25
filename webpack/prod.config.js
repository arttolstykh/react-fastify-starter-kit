const { resolve } = require('path')
const { merge } = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const clientCommonConfig = require('./client/common.config')
const serverCommonConfig = require('./server/common.config')

const clientConfig = () => merge(clientCommonConfig, {
  name: 'client',

  mode: 'production',

  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'js/[name].[contenthash].bundle.js'
  },

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime'
    }
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})

const serverConfig = () => merge(serverCommonConfig, {
  name: 'server',

  mode: 'production',

  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  }
})

module.exports = [clientConfig(), serverConfig()]

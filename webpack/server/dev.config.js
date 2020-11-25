const { resolve } = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const StartServerPlugin = require('razzle-start-server-webpack-plugin')
const commonConfig = require('./common.config')

module.exports = merge(commonConfig, {
  mode: 'development',

  output: {
    path: resolve(__dirname, '../../.build'),
    filename: '[name].js'
  },

  plugins: [
    new StartServerPlugin({
      verbose: true,
      debug: false,
      entryName: 'server',
      nodeArgs: ['--inspect']
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  watch: true
})

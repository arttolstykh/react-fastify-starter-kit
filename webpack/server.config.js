const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('razzle-start-server-webpack-plugin')
const common = require('./common.config')

module.exports = merge(common, {
  mode: 'development',

  entry: {
    server: path.resolve(__dirname, '../app/server/index.js')
  },

  output: {
    path: path.resolve(__dirname, '../.build'),
    filename: 'server.js'
  },

  target: 'node',

  externals: [
    nodeExternals({
      allowlist: /\.css$/
    })
  ],

  plugins: [
    new StartServerPlugin({
      verbose: true,
      debug: false,
      entryName: 'server',
      nodeArgs: ['--inspect']
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  watch: true,

  node: {
    __dirname: true,
    __filename: true
  }
})

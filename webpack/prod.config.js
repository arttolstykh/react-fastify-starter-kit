const { resolve } = require('path')
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./common.config')

const clientConfig = () => merge(common, {
  name: 'client',

  mode: 'production',

  entry: './app/client',

  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'js/[name].[contenthash].bundle.js'
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
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      title: 'React Starter Kit',
      template: resolve(__dirname, '../app/client/template.html'),
      filename: 'index.html'
    })
  ],

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

const serverConfig = () => merge(common, {
  name: 'server',

  mode: 'production',

  entry: './app/server',

  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },

  target: 'node',

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [
      resolve(__dirname, '../app'),
      'node_modules'
    ]
  },

  externals: [
    nodeExternals({
      allowlist: /\.css$/
    })
  ],

  node: {
    __dirname: true,
    __filename: true
  }
})

module.exports = [clientConfig(), serverConfig()]

const { resolve } = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const dev = process.env.NODE_ENV === 'development'

const plugins = [
  new CopyWebpackPlugin({
    patterns: [
      {
        from: resolve(__dirname, '../../assets'),
        to: 'assets',
        globOptions: {
          ignore: ['*.DS_Store']
        }
      }
    ]
  }),
  new HtmlWebpackPlugin({
    title: 'React Starter Kit',
    template: resolve(__dirname, '../../app/client/template.html'),
    filename: 'index.html'
  })
]

if (dev) {
  plugins.push(new CleanWebpackPlugin())
  plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  plugins.push(new MiniCssExtractPlugin({
    filename: 'styles/[name].[contenthash].css',
    chunkFilename: '[id].css'
  }))
}

module.exports = {
  target: 'web',

  entry: {
    client: resolve(__dirname, '../../app/client/index.js')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline'
      }
    ]
  },
  plugins
}

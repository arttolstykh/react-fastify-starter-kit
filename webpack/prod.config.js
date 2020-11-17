const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = [
  {
    name: 'client',
    
    mode: 'production',
    
    entry: {
      bundle: path.resolve(__dirname, '../app/client/index.js'),
    },
    
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/dist/',
      filename: '[name].[hash:8].js',
    },
    
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: false,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    
    resolve: {
      modules: [path.resolve(__dirname, '../app'), 'node_modules'],
    },
    
    devtool: 'source-map',
    
    target: 'web',
    
    stats: {
      cached: false,
      cachedAssets: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      timings: true,
      version: false,
    },
    
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css',
        chunkFilename: '[id].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../assets'),
            to: 'assets',
            globOptions: {
              ignore: ['*.DS_Store'],
            },
          },
        ],
      }),
    ],
    
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin(), "..."],
      runtimeChunk: {
        name: 'runtime',
      },
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  },
  {
    name: 'server',
    
    mode: 'production',
    
    entry: {
      bundle: path.resolve(__dirname, '../app/server/index.js'),
    },
    
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'server.js',
      libraryTarget: 'commonjs2',
    },
    
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: false,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    
    resolve: {
      modules: [path.resolve(__dirname, '../app'), 'node_modules'],
    },
    
    target: 'node',
    
    stats: {
      colors: true,
    },
    
    externals: [
      nodeExternals({
        whitelist: /\.css$/,
      }),
    ],
    
    node: {
      __dirname: true,
      __filename: true,
    },
  },
];

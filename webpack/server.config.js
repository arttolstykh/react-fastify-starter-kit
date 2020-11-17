const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const StartServerPlugin = require('start-server-webpack-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

module.exports = {
  mode: 'development',
  
  entry: {
    bundle: path.resolve(__dirname, '../app/server/index.js'),
  },
  
  output: {
    path: path.resolve(__dirname, '../.build'),
    filename: 'server.js',
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
    ],
  },
  
  resolve: {
    modules: [path.resolve(__dirname, '../app'), 'node_modules'],
  },
  
  performance: {
    hints: false,
  },
  
  target: 'node',
  
  stats: {
    colors: true,
  },
  
  externals: [
    nodeExternals({
      allowlist: /\.css$/,
    }),
  ],
  
  plugins: [
    new StartServerPlugin({
      name: 'server.js',
      nodeArgs: ['--inspect'],
    }),
    new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  
  watch: true,
  
  node: {
    __dirname: true,
    __filename: true,
  },
};

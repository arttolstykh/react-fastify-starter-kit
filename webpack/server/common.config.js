const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',

  entry: {
    server: resolve(__dirname, '../../app/server/index.js')
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
              importLoaders: 1,
              modules: {
                exportOnlyLocals: true
              }
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

  externals: [nodeExternals()],

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [
      resolve(__dirname, '../app'),
      'node_modules'
    ]
  },

  node: {
    __dirname: true,
    __filename: true
  }
}

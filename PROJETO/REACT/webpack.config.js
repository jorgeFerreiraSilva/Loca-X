const webpack = require('webpack');
const path = require('path');

const config = {
  entry: [
    'webpack/hot/dev-server',
    './src/index.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },
  devServer: {
    hot: true,
    contentBase: './dist',
    port: 3000,
    historyApiFallback: true
  }
};

module.exports = config;
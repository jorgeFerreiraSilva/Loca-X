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
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader']
      },

      // Load images.
      {
        test: /\.(gif|jp?g|png)$/,
        loader: 'url-loader?limit=25000',
        query: {
          limit: 10000,
          name: '/public/images/[name].[hash:8].[ext]'
        }
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
    historyApiFallback: true,
    watchContentBase: true
  }
};

module.exports = config;

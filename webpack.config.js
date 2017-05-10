var path = require('path'),
  webpack = require('webpack');

module.exports = {
  entry: {
    "bundle": './main.js'
  },
  output: {
    path : path.resolve(__dirname),
    filename : '[name].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.jsx?$/i,
      exclude: /(node_modules)/,
      use: {
        loader : 'babel-loader',
        options : {
          presets: ['es2015', 'react']
        }
      } 
    }]
  }
};

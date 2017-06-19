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
  plugins: [
    new webpack.DefinePlugin({ // <-- 减少 React 大小的关键
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(), //删除类似的重复代码
    new webpack.optimize.UglifyJsPlugin(), //最小化一切
    new webpack.optimize.AggressiveMergingPlugin()//合并块
  ],
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

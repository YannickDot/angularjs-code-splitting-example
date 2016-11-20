var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var loaders = [
  {
    "test": /\.js?$/,
    "exclude": /node_modules/,
    "loader": "babel-loader",
    "query": {
      "presets": [
        "es2015",
        "stage-0"
      ],
      "plugins": []
    }
  },
  {
    "test": /\.css?$/,
    "loader": "style-loader!css-loader"
  },
  {
    "test": /\.ts?$|\\.tsx?$/,
    "loader": "ts-loader",
    "query": {
      "transpileOnly": true,
      "isolatedModules": true,
      "silent": true,
      "compilerOptions": {
        "jsx": "react",
        "target": "es5"
      }
    }
  },
  {
    "test": /\.less?$/,
    "loader": "style-loader!css-loader!less-loader"
  },
  {
    "test": /\.html?$/,
    "loader": "raw-loader"
  },
  {
    "test": /\.json?$/,
    "loader": "json-loader"
  }
];

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve('src', 'main.js'),
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: loaders
  }
};

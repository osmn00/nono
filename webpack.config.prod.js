'use strict';

/**
 * 打包环境
 */

var glob = require('glob');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var folderPath = __dirname;
var htmlFiles;
var plugins = [

  // 将页面所需的 CSS 单独打包输出
  new ExtractTextPlugin('[name]/index.css'),

  // 压缩代码
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),

  // 跳过编译时出错的代码并记录，
  // 使编译后运行时的包不会发生错误。
  new webpack.NoErrorsPlugin()
];


function merge(obj, src) {
  for (var key in src) {
    if (src.hasOwnProperty(key)) obj[key] = src[key];
  }
  return obj;
}


// 获取入口文件列表
function getEntries() {
  var entryFiles = glob.sync('./src/pages/*/index.js');

  return entryFiles.reduce(function(memo, file) {
    var name = /.*\/(.*?)\/index\.js/.exec(file)[1];

    memo[name] = './src/pages/' + name + '/index.js';

    return memo;
  }, {});
}

// 获取 HTML 文件列表
function getHTMLFiles() {
  var htmlFiles = glob.sync('./src/pages/*/index.html');

  return htmlFiles.reduce(function(memo, file) {
    var name = /.*\/(.*?)\/index\.html/.exec(file)[1];

    memo[name] = './src/pages/' + name + '/index.html';

    return memo;
  }, {});
}

htmlFiles = getHTMLFiles();

for (var htmlFileName in htmlFiles) {
  var conf = {
    filename: htmlFileName + '/index.html',
    template: htmlFiles[htmlFileName],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    hash: false
  };

  plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = {
  entry: merge(getEntries(), {
    'mbase': './lib/mbase/index.js',
    'zepto': './lib/zepto/index.js'
  }),

  output: {
    path: path.join(folderPath, 'build'), // 输出路径
    filename: '[name]/index.js' // 输出名称或名称 pattern
  },

  module: {
    loaders: [
      // required for stylesheet
      // ExtractTextPlugin.extract() 打包样式文件为一个单独文件的写法
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')},

      // required for image
      {test: /\.(png|jpg)$/, loader: 'url-loader'},

      // required for json
      {test: /\.json$/, loader: 'json-loader'},

      // required for iconfont
      {test: /\.ttf$/, loader: 'file-loader?prefix=font/'},
      {test: /\.eot$/, loader: 'file-loader?prefix=font/'},
      {test: /\.svg$/, loader: 'file-loader?prefix=font/'},
      {test: /\.woff$/, loader: 'url-loader?prefix=font/&limit=5000&mimetype=application/font-woff'}
    ]
  },

  resolve: {
    extensions: ['', '.js', './index.js'] // 省略扩展名
  },

  plugins: plugins
};
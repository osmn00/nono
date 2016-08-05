'use strict';

var os = require('os');
var gulp = require('gulp');
var open = require('gulp-open');
var less = require('gulp-less');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var base64 = require('gulp-css-base64');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config');

var pkg = require('./package.json');
var browser = os.platform() === 'linux' ? 'google-chrome' : (os.platform() === 'darwin' ? 'google chrome' : (os.platform() === 'win32' ? 'chrome' : 'firefox'));

function getSrcString(filename, string) {
  var src = require('stream').Readable({objectMode: true});

  src._read = function() {
    this.push(new gutil.File({
      cwd: '',
      base: '',
      path: filename,
      contents: new Buffer(string)
    }));
    this.push(null)
  };

  return src
}

gulp.task('version', function() {
  return getSrcString('version', pkg.version)
    .pipe(gulp.dest('build/'))
});

gulp.task('livereload', function() {
  gulp.src('./src/**/*.*')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./src/**/*.*'], ['livereload']);
});

// 开启本地调试环境
gulp.task('connect', function() {
  connect.server({
    root: 'src/',
    port: 3001,
    livereload: true
  });
});

// 打开浏览器
gulp.task('open', function(done) {
  gulp.src('')
    .pipe(open({
      app: browser,
      uri: 'http://localhost:3001/'
    }))
    .on('end', done);
});

// 本地调试指令
gulp.task('d', ['dev']);
gulp.task('dev', ['connect', 'watch', 'open']);


// // 执行压缩指令, 不上传到远程 MFP
// gulp.task('zip', ['connect']);
//
//
// // 压缩并上传到远程 MFP
// gulp.task('mfp', ['connect']);
//
//
// // 发布指令
// gulp.task('p', ['publish']);
// gulp.task('publish', ['connect']);
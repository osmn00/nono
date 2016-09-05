'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var connect = require('gulp-connect');

// webpack
var webpack = require('webpack');
var webpackDevConfig = require('./webpack.config.js');
var webpackProdConfig = require('./webpack.config.prod.js');

gulp.task('webpack:dev', function(done) {
  webpack(webpackDevConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:dev', err);
    gutil.log('[webpack:dev]', stats.toString({colors: true}));
    done()
  })
});


gulp.task('webpack:build', function(done) {
  webpack(webpackProdConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({colors: true}));
    done()
  })
});


// clean
gulp.task('clean:dev', function() {
  return gulp.src('dist/', {
    read: false
  })
    .pipe(clean());
});

gulp.task('clean:build', function() {
  return gulp.src('build/', {
    read: false
  })
    .pipe(clean());
});


// livereload
gulp.task('livereload', function() {
  gulp.src('./src/**/*.*')
    .pipe(connect.reload());
});


// watch
gulp.task('watch', function() {
  gulp.watch(['./src/**/*.*'], ['webpack:dev', 'livereload']);
});


// 开启本地调试环境
gulp.task('connect', function() {
  connect.server({
    port: 3001,
    livereload: true
  });
});


// 本地调试指令
gulp.task('dev', ['clean:dev', 'webpack:dev', 'connect', 'watch']);

// 打包命令
gulp.task('build', ['clean:build', 'webpack:build']);
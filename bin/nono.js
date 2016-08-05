#!/usr/bin/env node
var program = require('commander');
var shell = require('shelljs');

var info = require('../package.json');
var deleteFiles = require('./lib/deleteFiles');
var createFiles = require('./lib/generateStructure');

program
  .allowUnknownOption()
  .version(info.version)
  .usage('[command] [project name]');

// 初始化操作
program
  .command('init')
  .description('initialize nono environment')
  .action(function(cmd, options) {
    shell.exec('npm install');
  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('    $ nono init');
    console.log();
  });

// add 操作
program
  .command('add <type> <name>')
  .alias('a')
  .description('add a new page [type p] | component [type c]')
  .action(function(cmd, options) {
    var type = cmd;
    var pageName = options;

    if (type === 'c' || type === 'p') {
      createFiles('src/' + type + '/' + pageName, type);
    } else {
      console.log('error!');
      return false;
    }
  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('    $ nono a p index     -- create src/p/index');
    console.log('    $ nono add p index');
    console.log('    $ nono a c slider    -- create src/c/slider');
    console.log('    $ nono add c slider');
    console.log();
  });

// delete 操作
program
  .command('del <type> <name>')
  .alias('d')
  .description('delete a page [type p] | component [type c]')
  .action(function(cmd, options) {
    var type = cmd;
    var pageName = options;

    if (type === 'c' || type === 'p') {
      deleteFiles('src/' + type + '/' + pageName);
      console.log('Delete success!')
    } else {
      console.log('error!');
      return false;
    }
  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('    $ nono d p index     -- delete src/p/index');
    console.log('    $ nono del p index');
    console.log('    $ nono d c slider    -- delete src/c/slider');
    console.log('    $ nono del c slider');
    console.log();
  });

// 开启调试环境操作
program
  .command('dev')
  .description('start local develop environment')
  .action(function(cmd, options) {
    shell.exec('gulp dev');
  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('    $ nono dev');
    console.log();
  });

// 开启调试环境操作
program
  .command('build')
  .alias('b')
  .description('building from the source')
  .action(function(cmd, options) {
    shell.exec('gulp build');
  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('    $ nono build');
    console.log();
  });

program.parse(process.argv);
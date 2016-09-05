#!/usr/bin/env node
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var program = require('commander');
var shell = require('shelljs');
var colors = require('colors');
var info = require('../package.json');
var curPath = process.cwd();
var deleteFiles = require('./lib/deleteFiles');
var createFiles = require('./lib/createFiles');


// 删除指定目录
function deleteFolder(path) {
  var files = [];

  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);

    files.forEach(function(file, index) {
      var curPath = path + '/' + file;

      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolder(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });

    fs.rmdirSync(path);
  }
}

// 拷贝 nono 脚手架下的代码到根目录
function removalFiles() {
  var structurePath = curPath + '/nono-scaffolding/';

  return fs.copyAsync(structurePath, curPath, {clobber: true})
    .then(function(err) {
      if (err) return console.error(err);
    }).then(function() {
      deleteFolder(structurePath);
    });
}

program
  .allowUnknownOption()
  .version(info.version)
  .usage('[command] [project name]');


// 安装 nono 脚手架
program
  .command('install')
  .description('install nono for this folder')
  .action(function(cmd, options) {
    if (fs.existsSync(curPath)) {
      files = fs.readdirSync(curPath);
      filesNameArr = [];

      files.forEach(function(file, index) {
        var fileName = file.toString();

        if (fileName !== '.DS_Store' && fileName !== '.git' && fileName !== '.idea') {
          filesNameArr.push(fileName);
        }
      });

      if (filesNameArr.length > 0) {
        console.log((curPath + '/ 不是一个空目录!').red);
      } else {
        console.log('install start ...'.green);
        shell.exec('git clone https://github.com/osmn00/nono-scaffolding.git');
        removalFiles();
        console.log('install success!'.green);
      }

    }

  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('    $ nono install');
    console.log();
  });


// 初始化操作
program
  .command('init')
  .description('initialize nono environment')
  .action(function(cmd, options) {
    console.log('init start ...'.green);
    shell.exec('npm install');
    console.log('init success!'.green);
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
  .action(function(command, name) {
    var type;

    switch (command) {
      case 'c' :
        type = 'common';
        break;

      case 'p' :
        type = 'page';
        break;

      default :
        console.log(('Not allowed Type! Please use "c" or "p".').red);
        return false;
    }

    createFiles(type, name);
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
  .action(function(command, name) {
    var type;

    switch (command) {
      case 'c' :
        type = 'common';
        break;

      case 'p' :
        type = 'page';
        break;

      default :
        console.log(('Not allowed Type! Please use "c" or "p".').red);
        return false;
    }

    deleteFiles('src/' + type + 's/' + name);

    console.log('Delete success!'.green);
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
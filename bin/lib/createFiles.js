var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var root = __dirname.replace(/bin\/lib/, 'bin/');

function substitute(str, obj) {
  if (!(Object.prototype.toString.call(str) === '[object String]')) {
    return '';
  }

  if (!(Object.prototype.toString.call(obj) === '[object Object]' && 'isPrototypeOf' in obj)) {
    return str;
  }

  return str.replace(/\{([^{}]+)\}/g, function(match, key) {
    var value = obj[key.replace(/\s+/g, '')];

    return (value !== undefined) ? '' + value : '';
  });
}

function generateStructure(type, name) {
  var projectPath = 'src/' + type + 's/' + name;
  var structurePath = root + 'structure/' + type;

  if (fs.existsSync(projectPath)) {
    console.log(('Create failed! ' + projectPath + ' is exit!').red);
  } else {

    return fs.copyAsync(structurePath, projectPath, {clobber: true})
      .then(function(err) {
        if (err) {
          return console.error(err);
        } else {

          if (type === 'page') {
            var pagePath = projectPath + '/index.html';
            var pageTemp = fs.readFileSync(pagePath, 'utf8');
            var pageHtml = substitute(pageTemp, {pageName: name});

            fs.writeFile(pagePath, pageHtml, 'utf8', function() {
              console.log(('Create success! The new page is ' + projectPath).green);
            });
          } else {
            console.log(('Create success! The new common module is ' + projectPath).green);
          }

        }
      })
  }
}

module.exports = generateStructure;
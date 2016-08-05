var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var root = __dirname.replace(/bin\/lib/, 'bin/');

function generateStructure(project, type) {
  var structurePath = root + 'structure/' + type;

  if (fs.existsSync(project)) {
    console.log('Create failed! ' + project + ' is exit!');
  } else {
    return fs.copyAsync(structurePath, project, {clobber: true})
      .then(function(err) {
        if (err) return console.error(err);
        console.log('Create success! The new page is ' + project);
      })
  }
}

module.exports = generateStructure;
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));

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

module.exports = deleteFolder;
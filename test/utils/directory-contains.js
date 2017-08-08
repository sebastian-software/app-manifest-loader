var glob = require('glob');
var steed = require('steed');
var fs = require('fs');
var path = require('path');

var readFile = (path, done) => fs.readFile(path, 'utf8', done);

module.exports = (referenceDir, targetDir, done) => {
  var compareFile = (file, done) => {
    var referenceFile = path.join(referenceDir, file);
    var targetFile = path.join(targetDir, file);

    steed.map([referenceFile, targetFile], readFile, (err, results) => {
      if (err) {
        return done(err);
      }

      done(null, results[0].trim() === results[1].trim());
    });
  };

  glob('**/*', { cwd: referenceDir, nodir: true }, (err, files) => {
    if (err) {
      return done(err);
    }

    steed.map(files, compareFile, (err, results) => {
      if (err) {
        return done(err);
      }

      done(
        null,
        !results.some(result => !result)
      );
    });
  });
};

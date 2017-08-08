var webpack = require('webpack');
var clean = require('rimraf');
var getSubDirsSync = require('./utils/get-sub-dirs-sync');
var directoryContains = require('./utils/directory-contains');

var successCases = getSubDirsSync(__dirname + '/success-cases');
var errorCases = getSubDirsSync(__dirname + '/error-cases');

describe('Success cases', function() {
  successCases.forEach(function(successCase) {
    describe(successCase, function() {
      beforeEach(function(done) {
        clean(
          __dirname + '/success-cases/' + successCase + '/actual-output',
          done
        );
      });

      test('generates the expected files', function() {
        var webpackConfig = require('./success-cases/' +
          successCase +
          '/webpack.config.js');

        webpack(webpackConfig, function(err, stats) {
          return new Promise((resolve, reject) => {
            if (err) {
              reject(err);
              return;
            }

            var caseDir = __dirname + '/success-cases/' + successCase;
            var expectedDir = caseDir + '/expected-output/';
            var actualDir = caseDir + '/actual-output/';

            directoryContains(expectedDir, actualDir, function(err, result) {
              if (err) {
                return done(err);
              }

              expect(result).toBeTruthy()
              resolve()
            });
          })
        });
      });
    });
  });
});

describe('Error cases', function() {
  errorCases.forEach(function(errorCase) {
    describe(errorCase, function() {
      beforeEach(function(done) {
        clean(__dirname + '/error-cases/' + errorCase + '/actual-output', done);
      });

      test('generates the expected error', function() {
        var webpackConfig = require('./error-cases/' +
          errorCase +
          '/webpack.config.js');
        var expectedError = require('./error-cases/' +
          errorCase +
          '/expected-error.js');

        return new Promise((resolve, reject) => {
          webpack(webpackConfig, function(err, stats) {
            var actualError = stats.compilation.errors[0]
              .toString()
              .split('\n')[0];
            expect(actualError.indexOf(expectedError)).not.toBe(-1);
            resolve(true)
          });
        });
      });
    });
  });
});

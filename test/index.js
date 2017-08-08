/* eslint-disable */
import webpack from "webpack"

import clean from "rimraf"
import getSubDirsSync from "./utils/get-sub-dirs-sync"
import directoryContains from "./utils/directory-contains"

var successCases = getSubDirsSync(`${__dirname}/success-cases`)
var errorCases = getSubDirsSync(`${__dirname}/error-cases`)

describe("Success cases", () => {
  successCases.forEach(successCase => {
    describe(successCase, () => {
      beforeEach(done => {
        clean(`${__dirname}/success-cases/${successCase}/actual-output`, done)
      })

      test("generates the expected files", () => {
        var webpackConfig = require(`./success-cases/${successCase}/webpack.config.js`)
          .default

        webpack(
          webpackConfig,
          (err, stats) =>
            new Promise((resolve, reject) => {
              if (err) {
                return reject(err)
              }

              var caseDir = `${__dirname}/success-cases/${successCase}`
              var expectedDir = `${caseDir}/expected-output/`
              var actualDir = `${caseDir}/actual-output/`

              directoryContains(expectedDir, actualDir, (err, result) => {
                if (err) {
                  return reject(err)
                }

                expect(result).toBeTruthy()
                resolve(result)
              })
            })
        )
      })
    })
  })
})

describe("Error cases", () => {
  errorCases.forEach(errorCase => {
    describe(errorCase, () => {
      beforeEach(done => {
        clean(`${__dirname}/error-cases/${errorCase}/actual-output`, done)
      })

      test("generates the expected error", () => {
        var webpackConfig = require(`./error-cases/${errorCase}/webpack.config.js`)
          .default
        var expectedError = require(`./error-cases/${errorCase}/expected-error.js`)
          .default

        return new Promise((resolve, reject) => {
          webpack(webpackConfig, (err, stats) => {
            var actualError = stats.compilation.errors[0]
              .toString()
              .split("\n")[0]

            expect(actualError.indexOf(expectedError)).not.toBe(-1)
            resolve(true)
          })
        })
      })
    })
  })
})

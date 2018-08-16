/* eslint-disable */
import webpack from "webpack"

import clean from "rimraf"
import getSubDirsSync from "./utils/get-sub-dirs-sync"
import directoryContains from "./utils/directory-contains"

var successCases = getSubDirsSync(`${__dirname}/success-cases`)
var errorCases = getSubDirsSync(`${__dirname}/error-cases`)

describe("Success cases", () => {
  successCases.forEach((successCase) => {
    describe(successCase, () => {
      beforeEach((done) => {
        clean(`${__dirname}/success-cases/${successCase}/actual-output`, done)
      })

      test("generates the expected files", async () => {
        var webpackConfig = require(`./success-cases/${successCase}/webpack.config.js`)

        await new Promise((resolve, reject) => {
          webpack(webpackConfig, (webpackError, stats) => {
            var actualError = stats.compilation.errors.join("\n")
            if (webpackError) {
              throw new Error(webpackError)
            }
            var actualError = stats.compilation.errors.join("\n")
            if (actualError) {
              throw new Error(actualError)
            }

            var caseDir = `${__dirname}/success-cases/${successCase}`
            var expectedDir = `${caseDir}/expected-output/`
            var actualDir = `${caseDir}/actual-output/`

            directoryContains(expectedDir, actualDir, (readError, result) => {
              if (readError) {
                throw new Error(readError)
              }

              expect(result).toBeTruthy()
              setTimeout(() => resolve(result), 500)
            })
          })
        })
      })
    })
  })
})

describe("Error cases", () => {
  errorCases.forEach((errorCase) => {
    describe(errorCase, () => {
      beforeEach((done) => {
        clean(`${__dirname}/error-cases/${errorCase}/actual-output`, done)
      })

      test("generates the expected error", async () => {
        var webpackConfig = require(`./error-cases/${errorCase}/webpack.config.js`).default
        var expectedError = require(`./error-cases/${errorCase}/expected-error.js`).default

        await new Promise((resolve, reject) => {
          webpack(webpackConfig, (webpackError, stats) => {
            var actualError = stats.compilation.errors.join("\n")

            expect(actualError.indexOf(expectedError)).not.toBe(-1)
            setTimeout(() => resolve(true), 500)
          })
        })
      })
    })
  })
})

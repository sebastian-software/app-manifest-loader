import glob from "glob"
import steed from "steed"
import fs from "fs"
import path from "path"

const readFile = (path, done) => fs.readFile(path, "utf8", done)

export default (referenceDir, targetDir, done) => {
  const compareFile = (file, done) => {
    const referenceFile = path.join(referenceDir, file)
    const targetFile = path.join(targetDir, file)

    steed.map([ referenceFile, targetFile ], readFile, (err, results) => {
      if (err) {
        return done(err)
      }

      done(null, results[0].trim() === results[1].trim())
    })
  }

  glob("**/*", { cwd: referenceDir, nodir: true }, (err, files) => {
    if (err) {
      return done(err)
    }

    steed.map(files, compareFile, (err, results) => {
      if (err) {
        return done(err)
      }

      done(null, !results.some((result) => !result))
    })
  })
}

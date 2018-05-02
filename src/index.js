/* eslint-disable max-params */

import steed from "steed"
import loaderUtils from "loader-utils"

function resolveImageSrc(loaderContext, image, callback) {
  if (typeof image.src !== "string") {
    return callback(
      new Error('Missing image "src" property in Web App Manifest')
    )
  }


  const context = loaderContext.context
  const request = loaderUtils.urlToRequest(image.src)

  console.log("Request:", request)

  loaderContext.resolve(context, request, function (err, filename) {
    if (err) {
      return callback(err)
    }

    console.log("Filename:", filename)

    loaderContext.addDependency(filename)

    loaderContext.loadModule(filename, function (err, source, map, module) {
      if (err) {
        return callback(err)
      }

      console.log("Full Filename:", filename)
      console.log("New Source:", source)

      // How to update the source here in our JSON?
      // image.src = ???

      callback(null)
    })
  })
}

function resolveImages(loaderContext, manifest, key, callback) {
  if (!Array.isArray(manifest[key])) {
    return callback(null)
  }

  return steed.map(manifest[key], resolveImageSrc.bind(null, loaderContext), (resolveError) => {
    if (resolveError) {
      return callback(resolveError)
    }

    callback(null)
  })
}

export default function (content, map, meta) {
  if (this.cacheable) {
    this.cacheable();
  }

  const options = loaderUtils.getOptions(this)

  var callback = this.async()
  var manifest

  try {
    manifest = JSON.parse(content)
  } catch (parseError) {
    return callback(new Error("Invalid JSON in Web App Manifest"))
  }

  steed.parallel(
    [
      resolveImages.bind(null, this, manifest, "splash_screens"),
      resolveImages.bind(null, this, manifest, "icons")
    ],
    (resolveError) => {
      if (resolveError) {
        return callback(resolveError)
      }

      console.log("Result:", manifest)
      var formatted = JSON.stringify(manifest, null, 2)
      console.log("Formatted:", formatted)

      callback(null, formatted)
    }
  )
}

import loaderUtils from "loader-utils"

const PUBLIC_MARKER = "__webpack_public_path__"

function resolveImageSrc(image, options) {
  if (typeof image.src !== "string") {
    throw new Error('Missing image "src" property in Web App Manifest')
  }

  return new Promise((resolve, reject) => {
    const context = this.context
    const request = loaderUtils.urlToRequest(image.src)

    const requestStr = loaderUtils.stringifyRequest(this, request)

    this.resolve(context, request, (err, filename) => {
      if (err) {
        return reject(err)
      }

      this.addDependency(filename)

      this.loadModule(filename, (err, source, map, module) => {
        if (err) {
          return reject(err)
        }

        const publicPath = options.publicPath ?
          loaderUtils.interpolateName(this, options.publicPath, { content: source }) :
          ""
        const assignmentWithPublicPath = source.replace(
          PUBLIC_MARKER,
          JSON.stringify(publicPath)
        )
        const getPublicSource = new Function(
          `var module={};return ${assignmentWithPublicPath}`
        )

        image.src = getPublicSource()
        resolve()
      })
    })
  })
}

function resolveImages(entries, options) {
  if (!Array.isArray(entries)) {
    return Promise.resolve()
  }

  return Promise.all(entries.map((entry) => resolveImageSrc.call(this, entry, options)))
}

export default function(content, map, meta) {
  if (this.cacheable) {
    this.cacheable()
  }

  const options = loaderUtils.getOptions(this) || {}
  const callback = this.async()

  const context =
    options.context || this.rootContext || (this.options && this.options.context)

  try {
    var manifest = JSON.parse(content)
  } catch (parseError) {
    return callback(new Error("Invalid JSON in Web App Manifest"))
  }

  Promise.all([
    resolveImages.call(this, manifest.splash_screens, options),
    resolveImages.call(this, manifest.icons, options)
  ])
    .then(() => {
      const formatted = JSON.stringify(manifest, null, 2)
      callback(null, formatted)
    })
    .catch((resolveError) => {
      callback(resolveError)
    })
}

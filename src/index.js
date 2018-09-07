import { extname } from "path"
import loaderUtils from "loader-utils"
import xmljs from "xml-js"

const PUBLIC_MARKER = "__webpack_public_path__"

function resolveImageSrc(image, options) {
  const hasAttributes = Boolean(image.attributes)
  const src = hasAttributes ? image.attributes.src : image.src
  if (typeof src !== "string") {
    throw new Error('Missing image "src" property for manifest entry.')
  }

  return new Promise((resolve, reject) => {
    const context = this.context
    const request = loaderUtils.urlToRequest(src)

    this.resolve(context, request, (err, filename) => {
      if (err) {
        return reject(err)
      }

      this.addDependency(filename)

      /* eslint-disable max-params */
      return this.loadModule(filename, (error, source, map, module) => {
        if (error) {
          return reject(error)
        }

        const publicPath = options.publicPath ?
          loaderUtils.interpolateName(this, options.publicPath, { content: source }) :
          ""
        const assignmentWithPublicPath = source.replace(
          PUBLIC_MARKER,
          JSON.stringify(publicPath)
        )

        /* eslint-disable no-new-func */
        const getPublicSource = new Function(
          `var module={};return ${assignmentWithPublicPath}`
        )

        if (hasAttributes) {
          image.attributes.src = getPublicSource()
        } else {
          image.src = getPublicSource()
        }

        return resolve()
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

function findElements(xmlElement, expectedName) {
  return xmlElement.elements.filter(({ name }) => name === expectedName)
}

export default async function(content, map, meta) {
  if (this.cacheable) {
    this.cacheable()
  }

  const options = loaderUtils.getOptions(this) || {}
  const callback = this.async()

  const fileExt = extname(this.resourcePath)

  if (fileExt === ".json" || fileExt === ".webmanifest") {
    let manifest
    try {
      manifest = JSON.parse(content)
    } catch (parseError) {
      return callback(new Error(`Invalid JSON in Web App Manifest: ${this.resourcePath}`))
    }

    try {
      await Promise.all([
        resolveImages.call(this, manifest.screenshots, options),
        resolveImages.call(this, manifest.icons, options)
      ])
    } catch(resolveError) {
      return callback(resolveError)
    }

    const formatted = JSON.stringify(manifest, null, 2)
    callback(null, formatted)
  } else if (fileExt === ".xml") {
    let browserconfig
    try {
      browserconfig = xmljs.xml2js(content)
    } catch (parseError) {
      return callback(new Error(`Invalid XML in Browserconfig: ${this.resourcePath}`))
    }

    const tiles = findElements(browserconfig, "browserconfig")
      .map((element) => findElements(element, "msapplication"))
      .reduce((accumulator, value) => [].concat(accumulator).concat(value), [])
      .map((element) => findElements(element, "tile"))
      .reduce((accumulator, value) => [].concat(accumulator).concat(value), [])
      .map((element) => element.elements)
      .reduce((accumulator, value) => [].concat(accumulator).concat(value), [])
      .filter((element) => element.attributes && element.attributes.src)

    try {
      await resolveImages.call(this, tiles, options)
    } catch(resolveError) {
      return callback(resolveError)
    }

    const formatted = xmljs.js2xml(browserconfig, {
      spaces: 2,
      indentAttributes: false
    })
    callback(null, formatted)
  } else {
    callback(new Error(`Unsupported manifest file: ${this.resourcePath}`))
  }
}

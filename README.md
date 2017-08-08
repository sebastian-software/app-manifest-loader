# Web App Manifest Loader for Webpack<br/>[![Sponsored by][sponsor-img]][sponsor] [![Version][npm-version-img]][npm] [![Downloads][npm-downloads-img]][npm] [![Build Status Unix][travis-img]][travis] [![Build Status Windows][appveyor-img]][appveyor] [![Dependencies][deps-img]][deps]

[sponsor-img]: https://img.shields.io/badge/Sponsored%20by-Sebastian%20Software-692446.svg
[sponsor]: https://www.sebastian-software.de
[deps]: https://david-dm.org/sebastian-software/edge-builder
[deps-img]: https://david-dm.org/sebastian-software/edge-builder.svg
[npm]: https://www.npmjs.com/package/edge-builder
[npm-downloads-img]: https://img.shields.io/npm/dm/edge-builder.svg
[npm-version-img]: https://img.shields.io/npm/v/edge-builder.svg
[travis-img]: https://img.shields.io/travis/sebastian-software/edge-builder/master.svg?branch=master&label=unix%20build
[appveyor-img]: https://img.shields.io/appveyor/ci/swernerx/edge-builder/master.svg?label=windows%20build
[travis]: https://travis-ci.org/sebastian-software/edge-builder
[appveyor]: https://ci.appveyor.com/project/swernerx/edge-builder/branch/master

Load images referenced in the `icons` and `splash_screens` fields in your [Web App Manifest](http://www.w3.org/TR/appmanifest/) using [webpack](https://github.com/webpack/webpack).

```bash
$ npm install --save-dev web-app-manifest-loader
```

## Usage

[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/#using-loaders)

In your webpack config:

```js
module: {
  rules: [
    {
      test: /manifest.json$/,
      use: [
        {
          loader: 'file-loader'
        },
        {
          loader: 'web-app-manifest-loader'
        }
      ]
    }
  ]
}
```

Note that this example also uses [file-loader](https://github.com/webpack-contrib/file-loader).

Then, require the manifest in your application code:

```js
import manifest from './manifest.json';
```

This allows you to provide image paths in the standard webpack format inside your manifest:

```js
{
  "name": "Hello World",
  ...
  "splash_screens": [
    {
      "src": "./images/splash-hi.png",
      "sizes": "2560x1440",
      "type": "image/png"
    },
    ...
  ],
  "icons": [
    {
      "src": "./images/icon-hi.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    ...
  ]
}
```

## Copyright

<img src="https://raw.githubusercontent.com/sebastian-software/readable-code/master/assets/sebastiansoftware.png" alt="Sebastian Software GmbH Logo" width="250" height="200"/>

Copyright 2017<br/>[Sebastian Software GmbH](http://www.sebastian-software.de)

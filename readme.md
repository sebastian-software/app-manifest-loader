# Web App Manifest Loader for Webpack<br/>[![Sponsored by][sponsor-img]][sponsor] [![Version][npm-version-img]][npm] [![Downloads][npm-downloads-img]][npm] [![Build Status Unix][travis-img]][travis] [![Build Status Windows][appveyor-img]][appveyor] [![Dependencies][deps-img]][deps]

[sponsor-img]: https://img.shields.io/badge/Sponsored%20by-Sebastian%20Software-692446.svg
[sponsor]: https://www.sebastian-software.de
[deps]: https://david-dm.org/sebastian-software/app-manifest-loader
[deps-img]: https://david-dm.org/sebastian-software/app-manifest-loader.svg
[npm]: https://www.npmjs.com/package/app-manifest-loader
[npm-downloads-img]: https://img.shields.io/npm/dm/app-manifest-loader.svg
[npm-version-img]: https://img.shields.io/npm/v/app-manifest-loader.svg
[travis-img]: https://img.shields.io/travis/sebastian-software/app-manifest-loader/master.svg?branch=master&label=unix%20build
[appveyor-img]: https://img.shields.io/appveyor/ci/swernerx/app-manifest-loader/master.svg?label=windows%20build
[travis]: https://travis-ci.org/sebastian-software/app-manifest-loader
[appveyor]: https://ci.appveyor.com/project/swernerx/app-manifest-loader/branch/master

Load images referenced in the `icons` and `splash_screens` fields in your [Web App Manifest](http://www.w3.org/TR/appmanifest/) using [webpack](https://github.com/webpack/webpack).

```bash
$ npm install --save-dev app-manifest-loader
```

## Web App Manifest

Here you'll find additional documentation on the corresponding standard:

- [Google Developers](https://developers.google.com/web/fundamentals/web-app-manifest/)
- [Mozilla](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [W3C](http://www.w3.org/TR/appmanifest/)

## Usage

[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/#using-loaders)

In your Webpack config:

```js
module: {
  rules: [
    {
      test: /manifest.json$/,
      use: [
        {
          loader: "file-loader"
        },
        {
          loader: "app-manifest-loader"
        }
      ]
    }
  ]
}
```

Note that this example also uses [file-loader](https://github.com/webpack-contrib/file-loader).

Then, require the manifest in your application code:

```js
import manifest from "./manifest.json"
```

In typical React application you might want to use React Helmet. Then the typical approach is to use the imported URL at the corresponding `link` element:

```html
<link rel="manifest" href={manifest} />
```

The manifest allows you to provide image paths in the standard webpack format inside your manifest:

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

<img src="https://cdn.rawgit.com/sebastian-software/sebastian-software-brand/3d93746f/sebastiansoftware-en.svg" alt="Sebastian Software GmbH Logo" width="250" height="200"/>

Copyright 2017-2018<br/>[Sebastian Software GmbH](http://www.sebastian-software.de)

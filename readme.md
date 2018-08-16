# Web App Manifest Loader for Webpack<br/>[![Sponsored by][sponsor-img]][sponsor] [![Version][npm-version-img]][npm] [![Downloads][npm-downloads-img]][npm] [![Build Status Unix][travis-img]][travis] [![Build Status Windows][appveyor-img]][appveyor] [![Dependencies][deps-img]][deps]

[sponsor]: https://www.sebastian-software.de
[deps]: https://david-dm.org/sebastian-software/app-manifest-loader
[npm]: https://www.npmjs.com/package/app-manifest-loader
[travis]: https://travis-ci.org/sebastian-software/app-manifest-loader
[appveyor]: https://ci.appveyor.com/project/swernerx/app-manifest-loader/branch/master

[sponsor-img]: https://badgen.net/badge/Sponsored%20by/Sebastian%20Software/692446
[deps-img]: https://badgen.net/david/dep/sebastian-software/app-manifest-loader
[npm-downloads-img]: https://badgen.net/npm/dm/app-manifest-loader
[npm-version-img]: https://badgen.net/npm/v/app-manifest-loader
[travis-img]: https://badgen.net/travis/sebastian-software/app-manifest-loader?label=unix%20build
[appveyor-img]: https://badgen.net/appveyor/ci/swernerx/app-manifest-loader?label=windows%20build

Loader to deal with modern PWA/SPA manifest files:

- [Web Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest): Chrome 39+
- [Browserconfig](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/dn320426\(v=vs.85\)): IE11+, Windows 8+

Easy to use. Two formats, one loader. Ready for Webpack v4. Enjoy.


```bash
$ npm install --save-dev app-manifest-loader
```

## Web App Manifest

Re-References all images declared in the `icons` and `screenshots` fields.

Here you'll find additional documentation on the corresponding standard:

- [Google Developers](https://developers.google.com/web/fundamentals/web-app-manifest/)
- [Mozilla](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [W3C](http://www.w3.org/TR/appmanifest/)


## Browserconfig

Re-References all images find in any of the `tile` configurations.


## Usage

[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/#using-loaders)

In your Webpack config:

```js
module: {
  rules: [
    {
      test: /(manifest\.webmanifest|browserconfig\.xml)$/,
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
import manifest from "./manifest.webmanifest"
import browserconfig from "./browserconfig.xml"
```

In typical React application you might want to use React Helmet. Then the typical approach is to use the imported URL at the corresponding `link` element:

```html
<link rel="manifest" href={manifest} />
<meta name="msapplication-config" content={browserconfig} />
```

For ReactJS you typically might want to use it together with [React Helmet Async](https://github.com/staylor/react-helmet-async):

```js
import Helmet from "react-helmet-async"

import manifest from "./manifest.webmanifest"
import browserconfig from "./browserconfig.xml"

function renderHead() {
  return (
    <Helmet>
      <link rel="manifest" href={manifest} />
      <meta name="msapplication-config" content={browserconfig} />
    </Helmet>
  )
}
```

The manifest allows you to provide image paths in the standard Webpack format inside your manifest:

```js
{
  "name": "Hello World",
  ...
  "screenshots": [
    {
      "src": "./images/screenshot-portrait.png",
      "sizes": "2560x1440",
      "type": "image/png"
    },
    ...
  ],
  "icons": [
    {
      "src": "./images/screenshot-landscape.png",
      "sizes": "1440x2560",
      "type": "image/png"
    },
    ...
  ]
}
```

## Alternatives

We chose to implement this as a loader to be able to import hand written and optimized manifests with their matching images.

An alternative concept would be to generate most of the required image by automatic image scaling by just defining a few master images. In this case you would typically use this well maintained plugin:

- [Webpack PWA Manifest](https://github.com/arthurbergmz/webpack-pwa-manifest)

Compared to the loader based solution this moves application specific data into the Webpack configuration. One could argue that with shared Webpack configurations this introduces some app specific sections in a tooling related file.


## Copyright

<img src="https://cdn.rawgit.com/sebastian-software/sebastian-software-brand/3d93746f/sebastiansoftware-en.svg" alt="Sebastian Software GmbH Logo" width="250" height="200"/>

Copyright 2017-2018<br/>[Sebastian Software GmbH](http://www.sebastian-software.de)

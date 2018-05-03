export default {
  entry: {
    main: `${__dirname}/index.js`
  },

  context: __dirname,
  mode: "development",

  output: {
    filename: "index.js",
    path: `${__dirname}/actual-output`
  },

  module: {
    rules: [
      {
        test: /manifest.json$/,
        use: [
          {
            loader: "file-loader"
          },
          {
            loader: "../../../lib/index.cjs.js"
          }
        ]
      }
    ]
  }
}

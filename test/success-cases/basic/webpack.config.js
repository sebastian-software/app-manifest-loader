module.exports = {
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
      },
      {
        test: /.gif$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "file-[hash:base62:8].[ext]"
            }
          }
        ]
      }
    ]
  }
}

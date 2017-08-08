export default {
  entry: {
    main: `${__dirname}/index.js`
  },

  context: __dirname,

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
            loader: "file-loader",
            options: {
              name: "manifest.json"
            }
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
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  }
}

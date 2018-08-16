module.exports = {
  entry: {
    main: `${__dirname}/index.js`
  },

  context: __dirname,
  mode: "development",
  devtool: false,

  output: {
    filename: "index.js",
    path: `${__dirname}/actual-output`
  },

  module: {
    rules: [
      {
        test: /browserconfig\.xml$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "browserconfig.xml"
            }
          },
          {
            loader: "../../../"
          }
        ]
      },
      {
        test: /.gif$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "file-[name].[ext]"
            }
          }
        ]
      }
    ]
  }
}

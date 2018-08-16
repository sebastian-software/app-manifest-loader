export default {
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
        test: /\.(webmanifest|xml)$/,
        type: "javascript/auto",
        use: [
          {
            loader: "file-loader",
            options: {
              name: "file-[name].[ext]"
            }
          },
          {
            loader: "../../../"
          }
        ]
      },
      {
        test: /\.gif$/,
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

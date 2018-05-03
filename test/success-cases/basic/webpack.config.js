module.exports = {
  entry: {
    main: `${__dirname}/index.js`
  },

  context: __dirname,
  mode: "development",
  devtool: false,

  output: {
    filename: "index.js",
    path: `${__dirname}/actual-output`,
    publicPath: 'http://cdn.example.com/assets/[hash]/'
  },

  module: {
    rules: [
      {
        test: /manifest.json$/,
        type: 'javascript/auto',
        use: [
          {
            loader: "file-loader",
            options: {
              name: "file-[name].[ext]"
            }
          },
          {
            loader: "../../../lib/index.cjs.js",
            options: {
              publicPath: "http://cdn.example.com/assets/[hash]/"
            }
          }
        ]
      },
      {
        test: /.gif$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/file-[name].[ext]"
            }
          }
        ]
      }
    ]
  }
}

export default {
  entry: {
    main: `${__dirname}/index.js`
  },

  context: __dirname,
  mode: "development",
  devtool: false,

  output: {
    filename: "index.js",
    path: `${__dirname}/actual-output`,
    publicPath: "http://cdn.example.com/assets/"
  },

  module: {
    rules: [
      {
        test: /\.webmanifest$/,
        type: "javascript/auto",
        use: [
          {
            loader: "file-loader",
            options: {
              name: "file-[name].[ext]"
            }
          },
          {
            loader: "../../../",
            options: {
              publicPath: "http://cdn.example.com/assets/"
            }
          }
        ]
      },
      {
        test: /\.gif$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "gifs/file-[name].[ext]"
            }
          }
        ]
      }
    ]
  }
}

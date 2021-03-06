const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
      "client": [
        "webpack-hot-middleware/client?reload=true",
        "./src/client.ts"
      ],
      "server": [
        "webpack-hot-middleware/client?reload=true",
        "./src/server.tsx"
      ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public")
  }
};
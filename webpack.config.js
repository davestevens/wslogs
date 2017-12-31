const path = require("path");

module.exports = {
  entry: {
      "client": "./src/client.ts"
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ ".ts", ".js" ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public")
  }
};
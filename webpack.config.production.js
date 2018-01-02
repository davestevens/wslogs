const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
      "client": "./src/client.ts",
      "server": "./src/server.tsx"
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
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production")
      }
    })
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public")
  }
};
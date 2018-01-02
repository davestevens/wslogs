module.exports = (app) => {
    if (process.env.NODE_ENV === "development") {
        const webpack = require("webpack");
        const webpackDevMiddleware = require("webpack-dev-middleware");
        const webpackHotMiddleware = require("webpack-hot-middleware");
        const config = require("../webpack.config");
        const compiler = webpack(config);

        app.use(webpackDevMiddleware(compiler));
        app.use(webpackHotMiddleware(compiler));
    } else {
        const express = require("express");
        const path = require("path");
        const publicDir = path.resolve(__dirname, "..", "public");

        app.use(express.static(publicDir));
    }
}

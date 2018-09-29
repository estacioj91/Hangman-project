const path = require("path");
module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
        path: path.resolve(__dirname, "docs/scripts"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                }
            }
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "docs"),
        publicPath: "/scripts/"
    },
    devtool: "source-map"
}
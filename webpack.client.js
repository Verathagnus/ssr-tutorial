const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const config = {
    //Where to start
    entry: './src/client/client.js',
    //Where to generate output
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    }
}
module.exports = merge(baseConfig, config)
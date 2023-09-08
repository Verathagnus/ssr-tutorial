const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const webpackNodeExternals = require('webpack-node-externals');

const config = {
    //Bundle for Nodejs rather than browser
    target: 'node',
    //Where to start
    entry: './src/index.js',
    //Where to generate output
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    externals: [webpackNodeExternals()] //Everything from node_modules folder is not bundled
}
module.exports = merge(baseConfig, config)
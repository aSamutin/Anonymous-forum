var webpack = require("webpack");
var path = require("path");
module.exports = {
    entry: "./client/src/app.js",
    output: {
        filename: "./client/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0']
                }
	          },

	          {	test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/},
	          { test: /\.ejs$/, loader: 'ejs-loader'},
            { test: /\.css$/, loader: "style-loader!css!"}
        ]
    },
    devtool: 'source-map'
};

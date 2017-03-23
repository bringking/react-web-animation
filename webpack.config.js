'use strict';
var webpack = require('webpack');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var env = process.env.NODE_ENV;

var reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
};
var reactDomExternal = {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
};

var config = {
    externals: {
        react: reactExternal,
        reactDom: reactDomExternal
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
            { test: /\.jsx$/, loaders: ['babel-loader'], exclude: /node_modules/ }
        ]
    },
    output: {
        library: 'ReactWebAnimation',
        libraryTarget: 'umd'
    },
    plugins: [
        new LodashModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin([
            "NODE_ENV"
        ])
    ]
};

if ( env === 'production' ) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                warnings: false
            }
        })
    );
}

module.exports = config;

var webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: {
        client: [path.join(__dirname, 'src/index.js')]
    },

    output: {
        path: 'dist',
        filename: '[name].js'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    node: {
        fs: 'empty'
    },
    module: {
        loaders: [
            { test: /\.json/, loader: 'json-loader' },
            { test: /\.jsx$/, exclude: [/node_modules/], loader: 'babel' },
            { test: /\.js$/, exclude: [/node_modules/], loader: 'babel' }
        ]
    }
};







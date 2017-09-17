const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    client: [path.join(__dirname, 'src/index.js')],
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  node: {
    fs: 'empty',
  },
  module: {
    loaders: [
      { test: /\.json/, loader: 'json-loader' },
      { test: /\.jsx$/, exclude: [/node_modules/], loader: 'babel-loader' },
      { test: /\.js$/, exclude: [/node_modules/], loader: 'babel-loader' },
    ],
  },
};

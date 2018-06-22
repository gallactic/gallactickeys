// var webpack = require('webpack');
// var path = require('path');
// var fs = require('fs');

// var nodeModules = {};
// fs.readdirSync('node_modules')
//   .filter(function(x) {
//     return ['.bin'].indexOf(x) === -1;
//   })
//   .forEach(function(mod) {
//     nodeModules[mod] = 'commonjs ' + mod;
//   });

// module.exports = {
//   mode: process.env.NODE_ENV || 'production',
//   entry: './index.js',
//   // target: 'node',
//   output: {
//     path: path.join(__dirname, 'build'),
//     filename: 'index.min.js'
//   },
//   // module: {
//   //   loaders: [
//   //     { test: /\.json$/, loader: 'json-loader' }
//   //   ]
//   // },
//   // externals: nodeModules,
//   plugins: [
//     new webpack.IgnorePlugin(/\.(css|less)$/),
//     new webpack.BannerPlugin('require("source-map-support").install();')
//   ],
//   // devtool: 'sourcemap'
// }

const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'TenderKeys'
  }
};
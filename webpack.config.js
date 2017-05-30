const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/app.jsx'),
  output: {
    path: path.join(__dirname, '/dist/js'),
    filename: 'app.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/client'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0', 'react'],
      }
    }],
  },
  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};

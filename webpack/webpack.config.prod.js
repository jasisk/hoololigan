var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = [{
  output: {
    path: path.resolve(__dirname, '..', 'dist', 'entry'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  entry: {
    server: [path.resolve(__dirname, '..', 'server', 'entry')]
  },
  target: 'node',
  externals: [/^[a-z0-9[]+$/i],
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: [ 'babel' ] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules') },
      { test: /\.png$/, loaders: [ 'file' ] }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin('[name].css', {allChunks: true}),
    new webpack.DefinePlugin({
      __DEVTOOLS__: false,
      __BROWSER__: false,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      }
    })
  ]
}, {
  output: {
    path: path.resolve(__dirname, '..', 'dist', 'entry'),
    publicPath: '/',
    filename: '[name].js'
  },
  entry: {
    client: [path.resolve(__dirname, '..', 'client', 'entry')]
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: [ 'babel' ] },
      { test: /\.css$/, loaders: [ 'css/locals?modules' ] },
      { test: /\.png$/, loaders: [ 'file' ] }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVTOOLS__: false,
      __BROWSER__: true,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      }
    })
  ]
}];

var webpack = require('webpack');
var path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, '..', 'common'),
    publicPath: '/',
    filename: '[name].js'
  },
  entry: {
    client: ['webpack-hot-middleware/client', path.resolve(__dirname, '../', 'client', 'entry')]
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: [ 'babel' ] },
      { test: /\.css$/, loaders: [ 'style', 'css?modules' ] },
      { test: /\.png$/, loaders: [ 'file' ] }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        BROWSER: true
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};

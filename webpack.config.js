let path = require( 'path' );

module.exports = {
  entry: "./app.js",
  output: {
    path: path.join( __dirname, 'build' ),
    filename: "./bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.coffee$/,
        loader: 'coffee-loader',
        exclude: /node_modules/
      }
    ]
  }
};
let path = require( 'path' ),
    ExtractTextPlugin = require( 'extract-text-webpack-plugin' ),
    webpack = require( 'webpack' );

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'app', 'entryPoints', 'main'),
    tweets: path.resolve(__dirname, 'app', 'entryPoints', 'tweets'),
    vendor: ['jquery', 'bootstrap', 'react', 'react-dom', 'angular']
  },
  output: {
    path: path.join( __dirname, 'build' ),
    filename: "[name].[chunkhash].bundle.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        query: require( path.resolve( __dirname, 'eslint.config.js' ) )
      }
    ],
    loaders: [
      {
        test: /\.coffee$/,
        loader: 'coffee-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ya?ml$/,
        loaders: ['json-loader', 'yaml-loader'],
        //loader: 'json-loader!yaml-loader'
        include: path.resolve( __dirname, 'app', 'config')
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: path.resolve( __dirname, 'app', 'ts')
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        //loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader')
        //loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.coffee', '', '.ts', '.css', '.scss', '.json'],
    alias: {
      fx_rates$: path.resolve(__dirname, 'app', 'fx_rates.js'),
      Api: path.resolve(__dirname, 'app', 'apis'),
      welcomeUser$: path.resolve(__dirname, 'app', 'welcomeUser.coffee'),
      typescript: path.resolve(__dirname, 'app', 'ts'),
      reactApp$: path.resolve(__dirname, 'app', 'react'),
      appConfig$: path.resolve(__dirname, 'app', 'config', 'appConfig.yaml' )
    }
  },
  plugins: [
    new ExtractTextPlugin( '[name].[chunkhash].css' ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].bundle.js',
      chunks: ['vendor']
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    inline: true,
    port: 3000
  }
};
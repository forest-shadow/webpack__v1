let path = require( 'path' );

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'app', 'entryPoints', 'main'),
    tweets: path.resolve(__dirname, 'app', 'entryPoints', 'tweets')
  },
  output: {
    path: path.join( __dirname, 'build' ),
    filename: "[name].bundle.js"
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
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.coffee', '', '.ts', '.css', '.scss'],
    alias: {
      fx_rates$: path.resolve(__dirname, 'app', 'fx_rates.js'),
      Api: path.resolve(__dirname, 'app', 'apis'),
      welcomeUser$: path.resolve(__dirname, 'app', 'welcomeUser.coffee'),
      typescript: path.resolve(__dirname, 'app', 'ts'),
      reactApp$: path.resolve(__dirname, 'app', 'react'),
      appConfig$: path.resolve(__dirname, 'app', 'config', 'appConfig.yaml' )
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    inline: true,
    port: 3000
  }
};
let path              = require( 'path' ),
  ExtractTextPlugin   = require( 'extract-text-webpack-plugin' ),
  webpack             = require( 'webpack' ),
  htmlWebpackPlugin   = require( 'html-webpack-plugin' ),
  cleanWebpackPlugin  = require( 'clean-webpack-plugin'),
  optimizeCssAssetsWebpackPlugin = require( 'optimize-css-assets-webpack-plugin');

module.exports = function(env) {
  return {
    entry: {
      main: path.resolve(__dirname, '..', 'app', 'entryPoints', 'main'),
      tweets: path.resolve(__dirname, '..', 'app', 'entryPoints', 'tweets'),
      vendor: ['jquery', 'bootstrap', 'react', 'react-dom', 'angular']
    },
    output: {
      path: path.join( __dirname, '..', 'build-prod' ),
      filename: "[name].[chunkhash].bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          exclude: /node_modules/,
          query: require( path.resolve( __dirname, 'eslint.config.js' ) )
        },
        {
          test: /\.coffee$/,
          use: 'coffee-loader',
          exclude: /node_modules/
        },
        {
          test: /\.ya?ml$/,
          use: ['json-loader', 'yaml-loader'],
          //loader: 'json-loader!yaml-loader'
          include: path.resolve( __dirname, '..', 'app', 'config')
        },
        {
          test: /\.ts$/,
          use: 'ts-loader',
          include: path.resolve( __dirname, '..', 'app', 'ts')
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [ 'react', ["es2015", { "modules": false }] ]
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!sass-loader'
          })
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
          use: 'url-loader?limit=100000'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.coffee', '.ts', '.css', '.scss', '.json'],
      alias: {
        fx_rates$: path.resolve(__dirname, '..', 'app', 'fx_rates.js'),
        Api: path.resolve(__dirname, '..', 'app', 'apis'),
        welcomeUser$: path.resolve(__dirname, '..', 'app', 'welcomeUser.coffee'),
        typescript: path.resolve(__dirname, '..', 'app', 'ts'),
        reactApp$: path.resolve(__dirname, '..', 'app', 'react'),
        appConfig$: path.resolve(__dirname, '..', 'app', 'config', 'appConfig.yaml' )
      }
    },
    plugins: [
      new ExtractTextPlugin( {
        filename: '[name].[chunkhash].css'
      } ),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.[chunkhash].bundle.js',
        chunks: ['vendor']
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new htmlWebpackPlugin({
        template: path.resolve( __dirname, '..', 'app', 'entryPoints', 'main', 'index.html' ),
        hash: true,
        chunks: [ 'vendor', 'main' ],
        minify: {
          collapseWhitespace: true
        }
      }),
      new htmlWebpackPlugin({
        template: path.resolve( __dirname, '..', 'app', 'entryPoints', 'tweets', 'tweets.html' ),
        hash: true,
        chunks: [ 'vendor', 'tweets' ],
        filename: 'tweets.html',
        minify: {
          collapseWhitespace: true
        }
      }),
      new cleanWebpackPlugin( ['build-prod'], {
        root: path.resolve( __dirname, '..' ),
        verbose: true
      } ),
      new optimizeCssAssetsWebpackPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } }
      })
    ],
    devServer: {
      contentBase: path.resolve(__dirname, '..', 'build-prod'),
      inline: true,
      port: 3000
    }
  }
};
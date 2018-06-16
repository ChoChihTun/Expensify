const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
  // Must run -p --env production in package.json
  const isProduction = env === 'production';
  // For extracting all css files into a common file
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: [
      'babel-polyfill', './src/app.js',
    ],
    // Different source map for dev & prod
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      historyApiFallback: true, // Need this for client side routing
      publicPath: '/dist/'
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public', 'dist')
    },
    mode: 'development',
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
        }
      }, 
      // Any file that ends with .scss
      {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            // Put loader in object so that we can use source map to check the original code location and not the styles.css in Browser's Inpect Element 
            {
              // Allow us to use css interpretation in js file such as import and url()
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              // Allow us to import sass files
              // MUST install node-sass package too --> helps us converts scss files to regular css file
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL), 'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID), 'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET), 'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      })
    ]
  }
}

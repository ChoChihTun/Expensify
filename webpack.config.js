const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  // Must run -p --env production in package.json
  const isProduction = env === 'production';
  // For extracting all css files into a common file
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: {
      app: './src/app.js',
    },
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
      CSSExtract
    ]
  }
}

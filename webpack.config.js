const path = require('path');

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry: {
      app: './src/app.js',
    },
    // Different source map for dev & prod
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      historyApiFallback: true, // Need this for client side routing
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public')
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
        use: [
          "style-loader", // Takes the css in js file and add it to the DOM so user can see
          "css-loader", // Allow us to use css interpretation in js file such as import and url()
          "sass-loader", // Allow us to import sass files
          // MUST install node-sass package too --> helps us converts scss files to regular css file
        ]
      }]
    }
  }
}

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    // publicPath: '/dist/',
    path: path.resolve(__dirname, './dist'),
  },
  devtool: 'inline-source-map',

  devServer: {
    overlay: true,
    historyApiFallback: true,
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new ExtractTextPlugin({ filename: 'styles.css', disable: true }),
  ],
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'resolve-url-loader'],
        }),
        // use: ["style-loader","css-loader","sass-loader",'resolve-url-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'resolve-url-loader'],
        }),
        // use: ["style-loader","css-loader",'resolve-url-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name]' + '--' + '[hash].[ext]',
          },
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        }],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: ['babel-loader'],
      },
    ],
  },


};

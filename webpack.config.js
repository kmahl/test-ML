const webpack =require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require("path");
const ASSET_PATH = process.env.ASSET_PATH || '/';
module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    publicPath: ASSET_PATH
  },
  module: {
    rules: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['es2015']
              }
            }
          },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["absolute/path/a", "absolute/path/b"]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin(['public'], {verbose:true})
  ],
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

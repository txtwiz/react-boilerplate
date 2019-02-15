/*global require, __dirname, module*/
const path = require('path')
  , webpack = require('webpack')
  , merge = require('webpack-merge')

  , MiniCssExtractPlugin = require('mini-css-extract-plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , CopyWebpackPlugin = require('copy-webpack-plugin')

  , APP_DIR = path.resolve(__dirname, '../src');

module.exports = env => {
  const { PLATFORM } = env;

  return merge([
      {
        'entry': ['@babel/polyfill', APP_DIR],
        'module': {
          'rules': [
            {
              'test': /\.js$/,
              'exclude': /node_modules/,
              'use': {
                'loader': 'babel-loader'
              }
            },
            {
              'test': /\.scss$/,
              'use': [
                PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader',
                'sass-loader'
              ]
            }
          ]
        },
        'plugins': [
          new HtmlWebpackPlugin({
            'template': './src/index.html',
            'filename': './index.html'
          }),
          new webpack.DefinePlugin({
            'process.env.VERSION': JSON.stringify(env.VERSION),
            'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
          }),
          new CopyWebpackPlugin([{ 'from': 'src/static' }])
        ]
    }
  ]);
};

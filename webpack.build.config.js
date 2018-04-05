/*global require,module,__dirname*/
const HtmlWebpackPlugin = require('html-webpack-plugin')
  , MiniCssExtractPlugin = require('mini-css-extract-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')
  , webpack = require('webpack')
  , path = require('path')
  , pathsToClean = [
      'dist'
    ]
  , SRC_DIR = path.resolve(__dirname, 'src')
  , OUTPUT_DIR = path.resolve(__dirname, 'dist')
  , config = {
    'entry': [
      'react-hot-loader/patch',
      `${SRC_DIR}/index.js`
    ],
    'output': {
      'path': OUTPUT_DIR,
      'publicPath': './',
      'filename': 'bundle.js'
    },
    'module': {
      'rules': [
        {
          'test': /\.scss$/,
          'use': [
            MiniCssExtractPlugin.loader,
            {
              'loader': 'css-loader',
              'options': {
                'sourceMap': true,
                'importLoader': 2
              }
            },
            'sass-loader'
          ]
        },
        {
          'test': /\.(js|jsx)$/,
          'exclude': /node_modules/,
          'use': ['babel-loader']
        },
        {
          'test': /\.html$/,
          'use': [
            {
              'loader': 'html-loader',
              'options': { 'minimize': true }
            }
          ]
        }
      ]
    },
    'resolve': {
      'extensions': ['*', '.js', '.jsx']
    },
    'plugins': [
      new CleanWebpackPlugin(pathsToClean),
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        'filename': 'bundle.[contenthash].css',
        'chunkFilename': '[id].css'
      }),
      new HtmlWebpackPlugin({
        'template': `${SRC_DIR}/index.html`
      })
    ]
  };

module.exports = config;

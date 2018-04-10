/*global require,module,__dirname*/
const HtmlWebpackPlugin = require('html-webpack-plugin')
  , webpack = require('webpack')
  , path = require('path')
  , SRC_DIR = path.resolve(__dirname, 'src')
  , OUTPUT_DIR = path.resolve(__dirname, 'dist')
  , defaultInclude = [SRC_DIR]
  , config = {
    'entry': [
      'react-hot-loader/patch',
      `${SRC_DIR}/index.js`
    ],
    'output': {
      'path': OUTPUT_DIR,
      'publicPath': '/',
      'filename': 'bundle.js'
    },
    'module': {
      'rules': [
        {
          'test': /\.scss$/,
          'use': [{
            'loader': 'style-loader'
          }, {
            'loader': 'css-loader'
          }, {
            'loader': 'sass-loader'
          }],
          'include': defaultInclude
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
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        'template': `${SRC_DIR}/index.html`
      })
    ],
    'devServer': {
      'historyApiFallback': true,
      'contentBase': OUTPUT_DIR,
      'hot': true
    }
  };

module.exports = config;

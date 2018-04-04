/*global require,module,__dirname*/
const webpack = require('webpack')
  , path = require('path')
  , SRC_DIR = path.resolve(__dirname, 'src')
  , OUTPUT_DIR = path.resolve(__dirname, 'dist')
  , defaultInclude = [SRC_DIR];

module.exports = {
	'entry': [
		'react-hot-loader/patch',
    './src/index.js'
	],
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
      }
    ]
  },
  'resolve': {
    'extensions': ['*', '.js', '.jsx']
  },
	'output': {
    'path': OUTPUT_DIR,
    'publicPath': '/',
    'filename': 'bundle.js'
	},
	'plugins': [
    new webpack.HotModuleReplacementPlugin()
  ],
	'devServer': {
		'contentBase': OUTPUT_DIR,
		'hot': true
	}
};

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

var isDevelopment = process.env.NODE_ENV !== 'production';
var BUILD_PATH = path.resolve(__dirname, 'lib');

var common = {
  entry: [],
  output: {},
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss' }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  postcss: [
    require('precss'),
    require('autoprefixer')
  ]
};

var finalConf;
if (isDevelopment) {
  finalConf = Object.assign({}, common);
  finalConf.entry = ['webpack-hot-middleware/client', './demo/app.js']; // HMR
  finalConf.output = {
    path: BUILD_PATH,
    filename: 'demo.js'
  };
  finalConf.devtool = 'source-map';
  finalConf.plugins = [...finalConf.plugins,
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()];
} else {
  // production config
  finalConf = Object.assign({}, common);
  finalConf.entry = './src/index.js';
  finalConf.output = {
    path: BUILD_PATH,
    filename: 'index.js',
    library: 'SimpleReactForm',
    libraryTarget: 'umd'
  };
  finalConf.devtool = false;
  finalConf.externals = {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  };
  finalConf.plugins = [...finalConf.plugins,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new CleanWebpackPlugin([BUILD_PATH]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ];
}

module.exports = finalConf;

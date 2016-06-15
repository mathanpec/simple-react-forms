'use strict';

// modules
let express = require('express');
let app = express();
let path = require('path');
let fs = require('fs');
let webpack = require('webpack');
let webpackMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');

// app variables
const webpackConfig = require(path.resolve(__dirname, 'webpack.config.js'));
const BUILD_PATH = path.resolve(__dirname, 'build');
const isDevelopment = process.env.NODE_ENV !== 'production';

// middlewares
app.use(express.static(BUILD_PATH));

if (isDevelopment) {
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(
    compiler,
    {stats: {colors: true}}
  ));

  app.use(webpackHotMiddleware(compiler));
}

// routes
app.get('*', (req, res) => {
  res.send(fs.readFileSync(path.resolve(BUILD_PATH, 'index.html'), 'utf8'));
});

app.listen(5000, () => {
  if (isDevelopment) console.log('App is running at http://localhost:5000');
});

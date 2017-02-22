/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const path = require('path');
const failPlugin = require('webpack-fail-plugin');

let useDashboard = false;

const plugins = [
];

if (process.argv.indexOf('-w') !== -1) {
  useDashboard = true;
  const dashboard = new Dashboard();
  plugins.push(new DashboardPlugin(dashboard.setData));
}

if (process.argv.indexOf('-p') !== -1) {
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }));
}

plugins.push(failPlugin);

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, './assets/'),
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loader: 'style!css!postcss',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|web_components)/,
        loader: 'babel',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /(\.jpg|\.jpeg|\.png|\.gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /(\.json)$/,
        loader: 'json-loader',
      },
    ],
  },
  externals: {
  },
  plugins,
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    host: '0.0.0.0',
    quiet: useDashboard,
  },
  postcss() {
    return {
      defaults: [],
    };
  },
};

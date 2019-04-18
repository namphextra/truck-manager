'use strict'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const path = require('path')

const devWebpackConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../public'),
    publicPath: '/public/',
    historyApiFallback: true,
    hot: true,
    port: 2400
  }
})

module.exports = devWebpackConfig

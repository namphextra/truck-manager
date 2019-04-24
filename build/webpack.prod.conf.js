'use strict'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')

const devWebpackConfig = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map'
})

module.exports = devWebpackConfig

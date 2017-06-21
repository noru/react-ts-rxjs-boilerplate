const merge = require('webpack-merge')
const webpack = require('webpack')
const config = require('./webpack.config.base')
const path = require('path')

const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
}

const PORT = 8888 

module.exports = merge(config, {
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      path.join(__dirname, '../src/js/index')
    ],
    vendor: ['react', 'react-dom', 'react-router'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS)
  ],
  devServer: {
    noInfo: true,
    overlay: true,
    hot: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    },
    contentBase: path.join(__dirname, "../src"),
    watchContentBase: true,
    historyApiFallback: true,
    port: PORT,
  }
})

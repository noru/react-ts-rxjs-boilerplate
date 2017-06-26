const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin

let alias = {
  js: path.join(__dirname, '../src/js'),
  models: path.join(__dirname, '../src/js/models'),
  components: path.join(__dirname, '../src/js/components'),
  observables: path.join(__dirname, '../src/js/observables'),
  routes: path.join(__dirname, '../src/js/routes'),
  utils: path.join(__dirname, '../src/js/utils'),
  mocks: path.join(__dirname, '../src/js/mocks'),
  css: path.join(__dirname, '../src/css'),
  services: path.join(__dirname, '../src/js/services'),
}

module.exports = {
  output: {
    filename: 'assets/js/[name].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/'
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    alias: alias,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'  // fetch API
    }),
    // Shared code
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'assets/js/vendor.bundle.js',
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),
    new TsConfigPathsPlugin({
      configFileName: 'tsconfig.json',
      compiler: 'typescript'
    })
  ],
  module: {
    loaders: [
      // JavaScript / ES6
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '../src/js'),
        loader: 'babel-loader'
      },
      // Typescript
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      // Images
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 8192,
          name: 'images/[name].[ext]?[hash]'
        }
      },
      // Fonts
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          limit: 8192,
          name: 'fonts/[name].[ext]?[hash]'
        }
      },
            // Sass
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, '../src/css')
        ],
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          { loader: 'sass-loader', query: { outputStyle: 'expanded' } }
        ]
      },
      // Sass + CSS Modules
      // {
      //   test: /\.scss$/,
      //   include: /src\/client\/assets\/javascripts/,
      //   loaders: [
      //     'style',
      //     {
      //       loader: 'css',
      //       query: {
      //         modules: true,
      //         importLoaders: 1,
      //         localIdentName: '[path][name]__[local]--[hash:base64:5]'
      //       }
      //     },
      //     'postcss',
      //     { loader: 'sass', query: { outputStyle: 'expanded' } }
      //   ]
      // },
      // CSS
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
}
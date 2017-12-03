const path = require('path')
const webpack = require('webpack')

// dev webpack config
module.exports = {
  // devtool: 'eval',
  devtool: 'source-map',
  entry: [
    path.join(__dirname, './entry'),
  ],
  output: {
    path: __dirname,
    filename: 'dev.js'
  },
  resolve: {
    modules: [
      path.join(__dirname, '../../node_modules'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-stage-0',
              '@babel/preset-react'
            ].map(require.resolve),
            plugins: [
              // require.resolve('@babel/plugin-transform-runtime')
              // require.resolve('@babel/plugin-transform-async-to-generator'),
            ]
          }
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

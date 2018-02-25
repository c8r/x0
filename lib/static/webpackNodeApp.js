const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

// bundle App for usage in node when a custom webpack config is provided
const config = {
  mode: 'development',
  output: {
    path: path.join(__dirname, './TMP'),
    filename: 'App.js',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  target: 'node',
  resolve: {
    modules: []
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              'babel-preset-env',
              'babel-preset-stage-0',
              'babel-preset-react'
            ].map(require.resolve),
            plugins: [
              require.resolve('babel-plugin-transform-runtime')
            ]
          }
        }
      },
    ]
  },
  plugins: [],
}

const bundleApp = (filename, options = {}) => {
  const dirname = path.dirname(filename)

  config.entry = filename

  config.resolve.modules.unshift(
    dirname,
    path.join(process.cwd(), 'node_modules'),
    path.join(dirname, 'node_modules'),
  )

  const userConfig = require(
    path.join(process.cwd(), options.config)
  )
  const mergedConfig = merge(config, userConfig)
  const compiler = webpack(mergedConfig)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
        return
      }

      try {
        const App = require('./TMP/App')
        resolve(App)
      } catch (e) {
        reject(e)
      }
    })
  })
}

const getApp = async (filename, options) => {
  if (!options.config) {
    const req = require(filename)
    return req.default || req
  }
  return await bundleApp(filename, options)
}

module.exports = getApp

const path = require('path')
const webpack = require('webpack')

const config = {
  entry: [
    path.join(__dirname, './entry')
  ],
  output: {
    filename: 'bundle.js'
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
              'babel-preset-env',
              'babel-preset-stage-0',
              'babel-preset-react'
            ].map(require.resolve),
            plugins: [
              require.resolve('babel-plugin-transform-runtime')
            ]
          }
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: []
}

module.exports = (filename, options = {}) => {
  if (options.static || !options.outDir) return

  const dirname = path.dirname(filename)

  config.output.path = path.join(process.cwd(), options.outDir)

  config.resolve.modules.unshift(
    dirname,
    path.join(process.cwd(), 'node_modules'),
    path.join(dirname, 'node_modules'),
  )

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      COMPONENT: JSON.stringify(filename)
    })
  )

  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )

  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  )

  const compiler = webpack(config)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      resolve(stats)
    })
  })
}

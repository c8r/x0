const path = require('path')
const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const merge = require('webpack-merge')

const config = {
  // mode: 'production',
  entry: [
    path.join(__dirname, './entry')
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/'
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
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new ReactLoadablePlugin({
      filename: path.join(__dirname, './TMP/react-loadable.json'),
    })
  ]
}

module.exports = (filename, options = {}) => {
  if (options.static || !options.outDir) return

  const dirname = path.dirname(filename)

  config.output.path = path.join(process.cwd(), options.outDir)

  if (options.basename) {
    config.output.publicPath = options.basename + '/'
  }

  config.resolve.modules.unshift(
    dirname,
    path.join(process.cwd(), 'node_modules'),
    path.join(dirname, 'node_modules')
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
    new MinifyPlugin()
  )

  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  )

  let mergedConfig = config
  if (options.config) {
    const userConfig = require(
      path.join(process.cwd(), options.config)
    )
    mergedConfig = merge(config, userConfig)
  }

  const compiler = webpack(mergedConfig)

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

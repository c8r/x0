require('babel-register')({
  presets: [
    [ require.resolve('babel-preset-env'), {
      targets: {
        node: '8'
      }
    }],
    require.resolve('babel-preset-stage-0'),
    require.resolve('babel-preset-react')
  ],
  plugins: [
    'react-loadable/babel',
    'babel-plugin-syntax-dynamic-import',
    'babel-plugin-dynamic-import-node',
  ].map(require.resolve)
})
const path = require('path')
const webpack = require('webpack')
const DevServer = require('webpack-dev-server')
const serve = require('webpack-serve')
const merge = require('webpack-merge')
const config = require('./config')

const getWebpackApp = require('../static/webpackNodeApp')

const dev = {
  hot: true,
  historyApiFallback: {
    index: '/dev'
  },
  overlay: true
}

const start = async (filename, options, config) => {
  const Component = await getWebpackApp(filename, options)

  const {
    proxy,
    port = 8000
  } = options

  const getProps = typeof Component.getInitialProps === 'function'
    ? Component.getInitialProps
    : async () => null

  const initialProps = await getProps(Object.assign({
    Component
  }, options))

  const props = Object.assign({}, options, initialProps)

  const defs = new webpack.DefinePlugin({
    COMPONENT: JSON.stringify(filename),
    PROPS: JSON.stringify(props)
  })

  config.plugins.push(defs)

  dev.contentBase = path.dirname(filename)

  if (proxy) {
    dev.proxy = proxy
  }

  const compiler = webpack(config)
  // const server = new DevServer(compiler, dev)
  const server = await serve({
    compiler,
    config,
    dev,
    port,
    logLevel: 'error',
    open: options.open,
  })

  console.log(server)

  return new Promise((resolve, reject) => {
    compiler.plugin('done', () => {
      console.log('compiler done')
      resolve(server)
    })

    server.on('listening', () => {
      console.log('listening')
    })

    // server.listen(port, err => {
    //   if (err) throw err
    // })
  })
}

module.exports = (filename, options = {}) => {
  if (!filename) return
  const dirname = path.dirname(filename)

  const {
    port = 8000
  } = options

  config.resolve.modules.unshift(
    dirname,
    path.join(process.cwd(), 'node_modules'),
    path.join(dirname, 'node_modules'),
  )

  config.entry.push(
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server'
  )

  let mergedConfig = config

  if (options.basename) {
    config.output.publicPath = options.basename + '/'
  }

  if (options.config) {
    const userConfig = require(
      path.join(process.cwd(), options.config)
    )
    mergedConfig = merge(config, userConfig)
  }

  return start(filename, options, mergedConfig)
}

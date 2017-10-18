require('babel-register')({
  presets: [
    [ require.resolve('babel-preset-env'), {
      targets: {
        node: '8'
      }
    }],
    require.resolve('babel-preset-stage-0'),
    require.resolve('babel-preset-react')
  ]
})
const path = require('path')
const webpack = require('webpack')
const DevServer = require('webpack-dev-server')
const config = require('./config')

const devOptions = {
  hot: true,
  historyApiFallback: {
    index: '/dev'
  },
  overlay: true
}

const start = async (filename, options, config) => {
  let pkg = {}

  const req = require(filename)
  const Component = req.default || req
  const {
    proxy,
    proxyPath = '/api',
    port = 8000
  } = options

  try {
    pkg = require(path.resolve(process.cwd(), 'package.json'))
  } catch (e) {}

  const pkgOpts = pkg.x0 || {}

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

  devOptions.contentBase = path.dirname(filename) // process.cwd()

  if (pkgOpts.proxy) {
    devOptions.proxy = pkgOpts.proxy
  } else if (proxy) {
    devOptions.proxy = {
      [proxyPath]: proxy
    }
  }

  const compiler = webpack(config)
  const server = new DevServer(compiler, devOptions)

  return new Promise((resolve, reject) => {
    compiler.plugin('done', () => {
      resolve(port)
    })

    server.listen(port, err => {
      if (err) throw err
    })
  })
}

module.exports = (filename, options = {}, cb) => {
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

  start(filename, options, config)
    .then(port => {
      cb(null, port)
    })
    .catch(err => {
      console.log(err)
      cb(err)
    })
}

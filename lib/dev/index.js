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

module.exports = (filename, options = {}, cb) => {
  if (!filename) return
  const dirname = path.dirname(filename)

  console.log('getting component', filename)
  const req = require(filename)
  console.log('req', req)
  const Component = req.default || req
  console.log(Component)
  const getProps = typeof Component.getInitialProps === 'function'
    ? Component.getInitialProps
    : () => null
  console.log('getProps', getProps)
  const initialProps = getProps(Object.assign({
    Component
  }, options))
  console.log(initialProps)
  const props = Object.assign({}, options, initialProps)
  console.log(props)

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

  const defs = new webpack.DefinePlugin({
    COMPONENT: JSON.stringify(filename),
    PROPS: JSON.stringify(props)
  })

  config.plugins.push(defs)

  const compiler = webpack(config)

  const server = new DevServer(compiler, devOptions)

  compiler.plugin('done', () => {
    if (typeof cb === 'function') cb(null, port)
  })

  server.listen(port, err => {
    if (err) throw err
  })
}

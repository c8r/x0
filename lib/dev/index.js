const path = require('path')
const webpack = require('webpack')
const DevServer = require('webpack-dev-server')
const open = require('opn')
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

  const {
    port = 8000,
    props = {}
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
    PROPS: JSON.stringify(props),
  })

  config.plugins.push(defs)

  const compiler = webpack(config)

  const server = new DevServer(compiler, devOptions)

  let opened = false
  compiler.plugin('done', () => {
    // if (options.open && !opened) {
    if (!opened) {
      open(`http://localhost:${port}`)
      opened = true
    }
    if (typeof cb === 'function') cb(null, port)
  })

  server.listen(port, err => {
    if (err) throw err
  })
}

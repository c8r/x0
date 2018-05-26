const path = require('path')
const webpack = require('webpack')
const serve = require('webpack-serve')
const history = require('connect-history-api-fallback')
const convert = require('koa-connect')
const MiniHTMLWebpackPlugin = require('mini-html-webpack-plugin')
const merge = require('webpack-merge')

const baseConfig = require('./config')
const createTemplate = require('./createTemplate')

const dev = {
  hot: true,
  logLevel: 'error',
  clientLogLevel: 'none',
  stats: 'errors-only'
}

module.exports = async (opts) => {
  const config = merge(baseConfig, opts.webpack)
  const template = createTemplate(opts)

  config.mode = 'development'
  config.context = opts.dirname
  config.entry = path.join(__dirname, './entry')
  config.output= {
    path: path.join(process.cwd(), 'dev'),
    filename: 'dev.js',
    publicPath: '/'
  }

  config.resolve.modules.unshift(
    opts.dirname,
    path.join(opts.dirname, 'node_modules')
  )

  config.plugins.push(
    new webpack.DefinePlugin({
      DEV: JSON.stringify(true),
      OPTIONS: JSON.stringify(opts),
      DIRNAME: JSON.stringify(opts.dirname),
      APP: JSON.stringify(opts.app),
    })
  )

  config.plugins.push(
    new MiniHTMLWebpackPlugin({
      context: opts,
      template
    })
  )

  if (opts.debug) {
    config.stats = 'verbose'
    // todo: enable other logging
  }

  const serveOpts = {
    config,
    dev,
    logLevel: 'error',
    port: opts.port,
    hot: { logLevel: 'error' },
    add: (app, middleware, options) => {
      app.use(convert(history({})))
    }
  }

  return new Promise((resolve, reject) => {
    serve(serveOpts)
      .then(server => {
        server.compiler.hooks.done.tap({ name: 'x0' }, (stats) => {
          resolve({ server, stats })
        })
      })
      .catch(reject)
  })
}

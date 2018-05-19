const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const MiniHTMLWebpackPlugin = require('mini-html-webpack-plugin')
const { generateJSReferences } = require('mini-html-webpack-plugin')
const merge = require('webpack-merge')
const React = require('react')
const { renderToString, renderToStaticMarkup } = require('react-dom/server')
const { StaticRouter } = require('react-router-dom')
const semver = require('semver')

const baseConfig = require('./config')
const createTemplate = require('./createTemplate')

const getApp = opts => {
  const config = merge(baseConfig, opts.webpack)

  config.mode = 'development'
  config.entry = path.join(__dirname, './entry.js')
  config.output= {
    path: opts.tempdir,
    filename: 'App.js',
    libraryTarget: 'umd'
  }
  config.target = 'node'

  const compiler = webpack(config)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
        return
      }
      const App = require(
        path.resolve(opts.tempdir, './App.js')
      )
      resolve(App)
    })
  })
}

const STYLED_COMPONENTS_VERSION = '>=3.0'
const EMOTION_VERSION = '>=9.0'

const getCSSLibrary = opts => {
  if (opts.cssLibrary) return opts.cssLibrary
  if (!opts.pkg) return null
  const deps = Object.assign({},
    opts.pkg.devDependencies,
    opts.pkg.dependencies
  )
  if (deps['styled-components']) {
    const scVersion = semver.coerce(deps['styled-components'])
    if (!semver.satisfies(scVersion, STYLED_COMPONENTS_VERSION)) return null
    return 'styled-components'
  }
  if (deps.emotion) {
    const emotionVersion = semver.coerce(deps.emotion)
    if (!semver.satisfies(emotionVersion, EMOTION_VERSION)) return null
    return 'emotion'
  }
  return null
}

const renderHTML = ({
  opts,
  routes,
  App,
  props,
  path
}) => {
  const render = opts.static ? renderToStaticMarkup : renderToString
  const cssLibrary = getCSSLibrary(opts)
  const app = React.createElement(App.default, { routes, path })
  let html
  let css
  switch (cssLibrary) {
    case 'styled-components':
      const { ServerStyleSheet } = require('styled-components')
      const sheet = new ServerStyleSheet()
      html = render(
        sheet.collectStyles(
          React.createElement(App.default, { routes, path })
        )
      )
      css = sheet.getStyleTags()
      return { path, html, css, props }
    case 'emotion':
      const { renderStylesToString } = require('emotion-server')
      html = renderStylesToString(
        render(app)
      )
      return { path, html, props }
    default:
      html = render(app)
      return { path, html, props }
  }
}

const remove = filename => {
  fs.remove(filename, err => {
    if (err) console.log(err)
  })
}

const getRoutes = async (App) => {
  const baseRoutes = await App.getRoutes()

  // todo clean up
  const dynamicRoutes = []
  baseRoutes.forEach(route => {
    if (route.props.routes) {
      route.props.routes.forEach(subroute => dynamicRoutes.push(
        Object.assign({}, route, subroute)
      ))
    }
  })
  const routes = [
    ...baseRoutes.filter(route => !route.props.routes),
    ...dynamicRoutes
  ]
  return routes
}

module.exports = async (opts) => {
  // mutation
  baseConfig.resolve.modules.unshift(
    path.join(opts.dirname, 'node_modules'),
    opts.dirname
  )

  // mutation
  baseConfig.plugins.push(
    new webpack.DefinePlugin({
      DEV: JSON.stringify(false),
      OPTIONS: JSON.stringify(opts),
      DIRNAME: JSON.stringify(opts.dirname)
    })
  )

  opts.tempdir = path.join(opts.outDir, 'TEMP')
  if (!fs.existsSync(opts.outDir)) fs.mkdirSync(opts.outDir)
  if (!fs.existsSync(opts.tempdir)) fs.mkdirSync(opts.tempdir)

  const App = await getApp(opts)
  const routes = await getRoutes(App)
  const template = createTemplate(opts)

  const pages = routes.map(route => renderHTML(
    Object.assign({}, route, {
      opts,
      App,
      routes,
    })
  ))

  const config = merge(baseConfig, opts.webpack)

  config.entry = path.join(__dirname, './entry')
  config.output = {
    path: opts.outDir,
    filename: 'bundle.js',
    publicPath: opts.basename
  }

  // push per route/page
  pages.forEach(({ path, html, css, props }) => {
    config.plugins.push(
      new MiniHTMLWebpackPlugin({
        filename: path + '/index.html',
        context: Object.assign({}, opts, props, { html, css }),
        template
      })
    )
  })
  const compiler = webpack(config)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
        return
      }
      remove(opts.tempdir)
      resolve(stats)
    })
  })
}

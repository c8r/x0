const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const MiniHTMLWebpackPlugin = require('mini-html-webpack-plugin')
const { generateJSReferences } = require('mini-html-webpack-plugin')
const merge = require('webpack-merge')
const React = require('react')
const { renderToString, renderToStaticMarkup } = require('react-dom/server')
const { StaticRouter } = require('react-router-dom')
const { Helmet } = require('react-helmet')
const semver = require('semver')

const util = require('util')

const baseConfig = require('./config')
const createTemplate = require('./createTemplate')

const getApp = opts => {
  const config = merge(baseConfig, opts.webpack)

  config.mode = 'development'
  config.entry = opts.entry || path.join(__dirname, '../src/entry.js')
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
const GLAMOR_VERSION = '>=2.0'

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
  if (deps.glamor) { // || deps.glamorous) {
    const glamorVersion = semver.coerce(deps.glamor)
    if (!semver.satisfies(glamorVersion, GLAMOR_VERSION)) return null
    return 'glamor'
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
      break
    case 'emotion':
      const { renderStylesToString } = require('emotion-server')
      html = renderStylesToString(
        render(app)
      )
      break
    case 'glamor':
      // doesn't seem to be working...
      const glamor = require('glamor/server')
      const res = glamor.renderStatic(() => (
        render(app)
      ))
      html = res.html
      css = `<style>${res.css}</style>`
      break
    default:
      html = render(app)
      break
  }
  const helmet = Helmet.renderStatic()
  const head = parseHelmet(helmet)
  // doesn't seem to be working...
  // console.log('head', head)
  return { html, css, path, props }
}

const parseHelmet = helmet => [
  helmet.title.toString(),
  helmet.link.toString(),
  helmet.meta.toString(),
  helmet.script.toString(),
  helmet.noscript.toString(),
  helmet.style.toString(),
  helmet.base.toString(),
].filter(n => !!n && n.length).join('\n')

const remove = filename => {
  fs.remove(filename, err => {
    if (err) console.log(err)
  })
}

const getRoutes = async (App) => {
  const routes = await App.getRoutes()

  const dynamicRoutes = []
  await Promise.all(
    routes.map(async route => {
      if (!route.props.routes) return null
      await Promise.all(
        route.props.routes.map(async subroute => {
          const pageProps = typeof route.Component.getInitialProps === 'function'
            ? await route.Component.getInitialProps(subroute)
            : {}
          dynamicRoutes.push(
            Object.assign({}, route, subroute, {
              props: Object.assign({}, route.props, subroute.props, pageProps)
            })
          )
          return
        })
      )
      return
    })
  )

  const staticRoutes = [
    ...routes.filter(route => !route.props.routes),
    ...dynamicRoutes.filter(route => !!route)
  ]
  return { routes, staticRoutes }
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
      DIRNAME: JSON.stringify(opts.dirname),
      MATCH: JSON.stringify(opts.match)
    })
  )

  opts.tempdir = path.join(opts.outDir, 'TEMP')
  if (!fs.existsSync(opts.outDir)) fs.mkdirSync(opts.outDir)
  if (!fs.existsSync(opts.tempdir)) fs.mkdirSync(opts.tempdir)

  const App = await getApp(opts)
  const { routes, staticRoutes } = await getRoutes(App)
  const template = createTemplate(opts)

  const pages = staticRoutes.map(route => renderHTML(
    Object.assign({}, route, {
      opts,
      App,
      routes,
    })
  ))

  const config = merge(baseConfig, opts.webpack)

  config.mode = opts.debug ? 'development' : 'production'
  if (opts.debug) {
    config.stats = 'verbose'
  }
  config.entry = path.join(__dirname, '../src/entry')
  config.output = {
    path: opts.outDir,
    filename: 'bundle.js',
    publicPath: (opts.basename || '') + '/'
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
      if (opts.static) {
        const bundle = path.join(opts.outDir, 'bundle.js')
        remove(bundle)
      }
      resolve(stats)
    })
  })
}

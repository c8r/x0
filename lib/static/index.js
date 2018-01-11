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

const fs = require('fs')
const path = require('path')
const React = require('react')
const { renderToString, renderToStaticMarkup } = require('react-dom/server')
const Loadable = require('react-loadable')
const { getBundles } = require('react-loadable/webpack')

const client = require('./client')
const getCSS = require('./getCSS')

const createHTML = ({
  body,
  css = '',
  initialProps,
  scripts = []
}) => ([
  '<!DOCTYPE html><meta charset="utf-8">',
  css,
  body,
  propsScript(initialProps),
  scripts.map(src => `<script src="${src}"></script>`).join('')
].join(''))

const propsScript = initialProps =>
  initialProps ? `<script id="__initial-props__" type="application/json">${JSON.stringify(initialProps)}</script>` : ''

const render = (Component, props, isStatic, modules = []) =>
  (isStatic ? renderToStaticMarkup : renderToString)(
    React.createElement(Loadable.Capture, {
      report: mod => modules.push(mod)
    },
      React.createElement(Component, props)
    )
  )

const renderHTML = async (Component, options) => {
  const modules = []
  const isStatic = options.static || !options.outDir
  const base = options.basename || ''
  const script = base + '/bundle.js'

  const hasInitialProps = typeof Component.getInitialProps === 'function'
  const getProps = hasInitialProps ? Component.getInitialProps : () => ({})

  const initialProps = await getProps(Object.assign({ Component }, options))
  const props = Object.assign({}, options, initialProps)

  const preloaded = await Loadable.preloadAll()
  const body = render(Component, props, isStatic, modules)

  const loadableStats = require(path.join(__dirname, './TMP/react-loadable.json'))
  const bundles = isStatic ? [] : getBundles(loadableStats, modules)
    .map(bundle => bundle.file)
    .map(src => base + '/' + src)

  const scripts = isStatic ? [] : [
    script,
    ...bundles
  ]

  let css = ''
  if (props.cssLibrary) {
    css = getCSS(Component, props)
  }

  const html = createHTML({
    body,
    css,
    initialProps: isStatic ? null : props,
    scripts
  })

  return html
}

const writePage = async (Component, options) => {
  const html = await renderHTML(Component, options)

  if (options.outDir) {
    const dir = path.join(
      process.cwd(),
      options.outDir,
      options.pathname || ''
    )
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    const name = path.join(dir, 'index.html')
    fs.writeFileSync(name, html)
  }

  return html
}

const createStatic = async (filename, baseOptions) => {
  const req = require(filename)
  const Component = req.default || req

  const options = Object.assign({}, Component.defaultProps, baseOptions)

  const bundle = await client(filename, options)

  let html
  if (options.routes && options.routes.length) {
    html = await options.routes.map(async pathname => {
      const res = await writePage(Component, Object.assign({}, options, {
        pathname
      }))
      return res
    })
  } else {
    html = await writePage(Component, options)
  }


  return { html, bundle }
}

module.exports = createStatic

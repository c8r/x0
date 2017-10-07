require('babel-register')({
  presets: [
    'babel-preset-env',
    'babel-preset-stage-0',
    'babel-preset-react'
  ].map(require.resolve)
})
const fs = require('fs')
const path = require('path')
const React = require('react')
const { renderToString, renderToStaticMarkup } = require('react-dom/server')
const client = require('./client')

const h = React.createElement

// simplified
const HTML = ({
  body,
  initialProps,
  scripts = [],
}) => h('html', null,
  h('div', {
    id: '__app',
    dangerouslySetInnerHTML: {
      __html: body
    }
  }),
  initialProps && typeof initialProps === 'object' && h('script', {
    id: '__initial-props__',
    type: 'application/json',
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(initialProps)
    }
  }),
  scripts.map(src => h('script', { key: src, src }))
)

const render = (Component, props, static) =>
  (static ? renderToStaticMarkup : renderToString)(
    React.createElement(Component, props)
  )

const doc = n => '<!DOCTYPE html>' + n

const getRoot = options => {
  if (typeof options.html !== 'string') return null
  const root = path.isAbsolute(options.html)
    ? options.html
    : path.join(process.cwd(), options.html)
  const Root = require(root).default || require(roo)
  return Root
}

const renderHTML = (Root, Component, options) => {
  const isStatic = options.static || !options.outDir
  let body = render(Component, options, isStatic)

  const base = options.baseurl || ''
  const script = base + '/bundle.js'
  let staticProps = null

  if (typeof Component.renderStatic === 'function') {
    staticProps = Component.renderStatic({
      Component,
      html: body,
      props: options
    })
    const props = Object.assign({}, options, staticProps)
    body = render(Component, props, isStatic)
  }

  const rootProps = Object.assign({}, options, {
    initialProps: isStatic ? null : options,
    body
  },
    staticProps,
    (isStatic ? null : { scripts: [ script ] })
  )
  const html = Root
    ? render(Root, rootProps, true)
    : render(HTML, rootProps, true)

  return doc(html)
}

const writePage = (Root, Component, options) => {
  const html = renderHTML(Root, Component, options)

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

module.exports = async (filename, options = {}, cb) => {
  const req = require(filename)
  const Component = req.default || req

  const Root = getRoot(options)

  let result
  if (options.routes && options.routes.length) {
    result = options.routes.map(pathname => {
      return writePage(Root, Component, Object.assign({}, options, {
        pathname
      }))
    })
  } else {
    result = writePage(Root, Component, options)
  }

  await client(filename, options)

  if (typeof cb === 'function') {
    cb(null, result)
  }

  return result
}

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
const Html = require('./Html')
const client = require('./client')

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
  const body = render(Component, options, isStatic)

  const base = options.baseurl || ''
  const script = base + '/bundle.js'
  const rootProps = Object.assign({}, options, {
    initialProps: isStatic ? null : options,
    children: body
  },
    (isStatic ? null : { scripts: [ script ] })
  )
  const html = Root
    ? render(Root, rootProps, true)
    : render(Html, rootProps, true)

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

const renderBundle = async (filename, options) => {
  const stats = await client(filename, options)
  return
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

  await renderBundle(filename, options)

  if (typeof cb === 'function') {
    cb(null, result)
  }

  return result
}

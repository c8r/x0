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
const { renderToString } = require('react-dom/server')
const Html = require('./Html')
const client = require('./client')
// const renderCSS = require('./css')

const render = (Component, props) => renderToString(
  React.createElement(Component, props)
)

const doc = n => '<!DOCTYPE html>' + n

module.exports = async (filename, root, options = {}, cb) => {
  const {
    props = {},
    routes
  } = options
  const req = require(filename)
  const Component = req.default || req

  const Root = root ? require(root).default || require(root) : null

  const body = render(Component, props)

  const stats = await client(filename, options)

  // probably just delegate this to custom Root components
  // const css = renderCSS(Component, props)

  const rootProps = Object.assign({}, options, props, {
    // css,
    scripts: [
      'bundle.js'
    ],
    initialProps: JSON.stringify(props),
    children: body
  })
  const html = Root
    ? render(Root, rootProps)
    : render(Html, rootProps)

  if (typeof cb === 'function') {
    if (options.outDir) {
      const name = path.join(process.cwd(), options.outDir, 'index.html')
      fs.writeFileSync(name, doc(html))
    }
    cb(null, doc(html))
  }

  return doc(html)
}

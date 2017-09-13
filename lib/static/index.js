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

const render = (Component, props) => renderToString(
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

module.exports = async (filename, options = {}, cb) => {
  const { routes } = options
  const req = require(filename)
  const Component = req.default || req

  const Root = getRoot(options)

  // todo: handle options.routes array
  const body = render(Component, options)
  const stats = await client(filename, options)

  const rootProps = Object.assign({}, options, {
    scripts: [
      'bundle.js'
    ],
    initialProps: JSON.stringify(options),
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

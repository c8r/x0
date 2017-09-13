require('babel-register')({
  presets: [
    'babel-preset-env',
    'babel-preset-stage-0',
    'babel-preset-react'
  ].map(require.resolve)
})

const React = require('react')
const { renderToString } = require('react-dom/server')
const Html = require('./Html')
const renderCSS = require('./css')

const pkg = require('pkg-up').sync()

const render = (Component, props) => renderToString(
  React.createElement(Component, props)
)

const doc = n => '<!DOCTYPE html>' + n

module.exports = (filename, root, options = {}, cb) => {
  const {
    props = {}
  } = options
  const req = require(filename)
  const Component = req.default || req

  const Root = root ? require(root).default || require(root) : null

  const body = render(Component, props)

  // const css = renderCSS(Component, props)

  const rootProps = Object.assign({}, props, {
    // css,
    children: body
  })
  const html = Root
    ? render(Root, rootProps)
    : render(Html, rootProps)

  if (typeof cb === 'function') cb(null, doc(html))

  return doc(html)
}

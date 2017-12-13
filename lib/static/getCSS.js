const React = require('react')
const { renderToString } = require('react-dom/server')

const getSC = (Component, props) => {
  const SC = require('styled-components')
  const sheet = new SC.ServerStyleSheet()
  renderToString(
    sheet.collectStyles(
      React.createElement(Component, props)
    )
  )
  const tags = sheet.getStyleTags()
  return tags
}

const getGlamor = (Component, props) => {
  const glamor = require('glamor/server')
  const { css } = glamor.renderStatic(() => (
    renderToString(
      React.createElement(Component, props)
    )
  ))
  const tag = `<style>${css}</style>`
  return tag
}

const libraries = {
  'styled-components': getSC,
  glamorous: getGlamor,
  glamor: getGlamor,
}

const noop = () => ''

module.exports = (Component, props = {}) => {
  const { cssLibrary } = props
  const getCSS = libraries[cssLibrary] || noop

  // style tag strings
  const css = getCSS(Component, props)

  return css
}

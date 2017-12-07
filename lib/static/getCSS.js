const React = require('react')
const { renderToString } = require('react-dom/server')
const SC = require('styled-components')

const getSC = (Component, props) => {
  const sheet = new SC.ServerStyleSheet()
  renderToString(
    sheet.collectStyles(
      React.createElement(Component, props)
    )
  )
  const tags = sheet.getStyleTags()

  return tags
}

const libraries = {
  'styled-components': getSC
}

const noop = () => ''

module.exports = (Component, props = {}) => {
  const { cssLibrary } = props
  const getCSS = libraries[cssLibrary] || noop

  const css = getCSS(Component, props)

  return css
}

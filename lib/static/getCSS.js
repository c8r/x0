const React = require('react')
const { renderToString } = require('react-dom/server')
const SC = require('styled-components')
const glamor = require('glamor/server')

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

const getGlamor = (Component, props) => {
  const { css } = glamor.renderStatic(() => (
    renderToString(
      React.createElement(Component, props)
    )
  ))
  const tag = `<style>${css}</style>`
  return tag
}

const getEmotion = (Component, props) => {
}

const getFela = (Component, props) => {
}

const libraries = {
  'styled-components': getSC,
  glamorous: getGlamor,
  glamor: getGlamor,
  // emotion: getEmotion,
  // fela: getFela,
}

const noop = () => ''

module.exports = (Component, props = {}) => {
  const { cssLibrary } = props
  const getCSS = libraries[cssLibrary] || noop

  // style tag strings
  const css = getCSS(Component, props)

  return css
}

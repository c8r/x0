const React = require('react')
const { hydrate } = require('react-dom')

const App = require(COMPONENT).default || require(COMPONENT)

const data = document.getElementById('__initial-props__').innerHTML
const props = JSON.parse(data)

// allow for custom render target
const div = typeof app !== 'undefined' ? app : document.body

hydrate(
  React.createElement(App, props),
  div
)

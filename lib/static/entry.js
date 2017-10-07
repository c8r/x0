const React = require('react')
const { hydrate } = require('react-dom')

const App = require(COMPONENT).default || require(COMPONENT)

const data = document.getElementById('__initial-props__').innerHTML
const props = JSON.parse(data)

hydrate(
  React.createElement(App, props),
  app
)

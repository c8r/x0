const React = require('react')
const { render } = require('react-dom')

const App = require(COMPONENT).default || require(COMPONENT)

const data = document.getElementById('__initial-props__').innerHTML
const props = JSON.parse(data)

render(
  React.createElement(App, props),
  app
)

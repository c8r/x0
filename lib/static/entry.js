const React = require('react')
const { hydrate } = require('react-dom')

const App = require(COMPONENT).default || require(COMPONENT)

const data = document.getElementById('__initial-props__').innerHTML
const props = JSON.parse(data)

// const div = typeof APP !== 'undefined' ? APP : document.body

const div = document.documentElement

hydrate(
  React.createElement(App, props),
  div
)

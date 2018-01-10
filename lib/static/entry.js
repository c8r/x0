const React = require('react')
const { hydrate } = require('react-dom')
const Loadable = require('react-loadable')

const App = require(COMPONENT).default || require(COMPONENT)
const data = document.getElementById('__initial-props__').innerHTML
const props = JSON.parse(data)
const div = document.documentElement

Loadable.preloadReady()
  .then(() => {
    hydrate(
      React.createElement(App, props),
      div
    )
  })

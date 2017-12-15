const React = require('react')
const { render } = require('react-dom')
const App  = require('./App')

const div = typeof APP !== 'undefined' ? APP : document.body

const id = require.resolve(COMPONENT)
const req = require(COMPONENT)
const Component = req.default || req

const props = Object.assign({
  id,
  Component
}, PROPS)

const app = render(React.createElement(App, props), div)

if (module.hot) {
  module.hot.accept(id, function () {
    const next = require(COMPONENT)
    const NextComponent = next.default || next
    app.setState({
      Component: NextComponent
    })
  })
}

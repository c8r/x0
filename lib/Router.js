const React = require('react')
const {
  BrowserRouter,
  StaticRouter,
  Router,
  Route,
  Link
} = require('react-router-dom')

const UniversalRouter = typeof document !== 'undefined' ? BrowserRouter : StaticRouter
const LowLevelRouter = typeof document !== 'undefined' ? Router : StaticRouter

const h = React.createElement

const Router = props => h(UniversalRouter, props,
  h('div', null, props.children)
)


Router.defaultProps = {
  context: {}
}

module.exports = Router
module.exports.LowLevel = LowLevelRouter
module.exports.Route = Route
module.exports.Link = Link

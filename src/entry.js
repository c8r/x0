// Main application
import path from 'path'
import React from 'react'
import { render, hydrate } from 'react-dom'
import {
  StaticRouter,
  BrowserRouter,
  Switch,
  Route,
  Link,
  withRouter
} from 'react-router-dom'
import minimatch from 'minimatch'

import Catch from './Catch'
import ScopeProvider from './ScopeProvider'
import FileList from './FileList'
import ScrollTop from './ScrollTop'

const IS_CLIENT = typeof document !== 'undefined'
const req = require.context(DIRNAME, true, /\.(js|md|mdx|jsx)$/)

const { filename, basename = '', disableScroll } = OPTIONS
const index = filename ? path.basename(filename, path.extname(filename)) : 'index'

req.keys().forEach(key => {
  console.log(key, minimatch(key.replace(/^\.\//, ''), MATCH) )
})

const getComponents = req => req.keys()
  .filter(key => !MATCH || minimatch(key.replace(/^\.\//, ''), MATCH))
  .map(key => ({
    key,
    name: path.basename(key, path.extname(key)),
    module: req(key),
    Component: req(key).default || req(key)
  }))
  .filter(component => !/^(\.|_)/.test(component.name))
  .filter(component => typeof component.Component === 'function')

const initialComponents = getComponents(req)

const DefaultApp = ({ render, routes }) => (
  <Switch>
    {render()}
    <Route render={props => (
      <FileList
        {...props}
        routes={routes}
      />
    )} />
  </Switch>
)

const Router = IS_CLIENT ? BrowserRouter : StaticRouter
const App = APP ? (require(APP).default || require(APP)) : DefaultApp

export const getRoutes = async (components = initialComponents) => {
  const routes = await components.map(async ({ key, name, module, Component }) => {
    const exact = name === index
    let pathname = exact ? '/' : '/' + name
    const props = Component.getInitialProps
      ? await Component.getInitialProps({ path: pathname })
      : {}
    pathname = props.path || pathname
    return {
      key: name,
      name,
      path: pathname,
      exact,
      module,
      Component,
      props
    }
  })
  return Promise.all(routes)
}

const RouterState = withRouter(({ render, ...props }) => {
  const route = props.routes.find(r => r.path === props.location.pathname)
  return render({ ...props, route })
})

export default class Root extends React.Component {
  static defaultProps = {
    path: '/',
    basename
  }
  state = {
    ...this.props,
    ...App.defaultProps
  }

  render () {
    const {
      routes,
      basename,
      path = '/'
    } = this.props

    console.log('App', App.defaultProps)

    return (
      <Router
        context={{}}
        basename={basename}
        location={path}>
        <React.Fragment>
          <ScopeProvider>
            <Catch>
              <RouterState
                routes={routes}
                render={(router) => (
                  <App
                    {...router}
                    routes={routes}
                    render={appProps => (
                      routes.map(({ Component, ...route }) => (
                        <Route
                          {...route}
                          render={props => (
                            <Catch>
                              <Component
                                {...props}
                                {...appProps}
                                {...route.props}
                              />
                            </Catch>
                          )}
                        />
                      ))
                    )}
                  />
                )}
              />
            </Catch>
            {!disableScroll && <ScrollTop />}
          </ScopeProvider>
        </React.Fragment>
      </Router>
    )
  }
}

let app
if (IS_CLIENT) {
  const mount = DEV ? render : hydrate
  const div = window.root || document.body.appendChild(
    document.createElement('div')
  )
  getRoutes()
    .then(routes => {
      app = mount(<Root routes={routes} />, div)
    })
}

if (IS_CLIENT && module.hot) {
  module.hot.accept()
}


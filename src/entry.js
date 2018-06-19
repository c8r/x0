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
import { Provider as RebassProvider } from 'rebass'
import minimatch from 'minimatch'
import sortBy from 'lodash.sortby'

import ScopeProvider from './ScopeProvider'
import Catch from './Catch'
import FileList from './FileList'
import ScrollTop from './ScrollTop'
import CenteredLayout from './CenteredLayout'

const IS_CLIENT = typeof document !== 'undefined'
const req = require.context(DIRNAME, true, /\.(js|md|mdx|jsx)$/)

const { filename, basename = '', disableScroll } = OPTIONS
const index = filename ? path.basename(filename, path.extname(filename)) : 'index'

const getComponents = req => req.keys()
  .filter(minimatch.filter('!node_modules'))
  .filter(key => !MATCH || minimatch(key.replace(/^\.\//, ''), MATCH))
  .filter(key => !/^_/.test(path.basename(key)))
  .map(key => ({
    key,
    name: path.basename(key, path.extname(key)),
    module: req(key),
    Component: req(key).default || req(key),
  }))
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
  const promises = await components.map(async ({
    key,
    name,
    module,
    Component
  }) => {
    const exact = name === index
    name = exact ? '/' : '/' + name
    const dirname = path.dirname(key).replace(/^\./, '')
    const extname = path.extname(key)
    let pathname = dirname + (exact ? '/' : name)
    const href = pathname
    const initialProps = Component.getInitialProps
      ? await Component.getInitialProps({ path: pathname })
      : {}
    const meta = module.frontMatter || {}
    const props = { ...meta, ...initialProps }
    pathname = props.path || pathname
    return {
      key,
      name,
      extname,
      href,
      path: pathname,
      dirname,
      exact,
      module,
      Component,
      props
    }
  })
  const routes = await Promise.all(promises)
  const filtered = routes.filter(r => !r.props.ignore)
  let sorted = [...filtered]
  sorted = sortBy([...sorted], a => a.name)
  sorted = sortBy([...sorted], a => !a.exact)
  sorted = sortBy([...sorted], a => a.dirname)
  return sorted
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
    console.log('routes', routes)

    return (
      <Router
        context={{}}
        basename={basename}
        location={path}>
        <React.Fragment>
          <RebassProvider>
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
                                <CenteredLayout
                                  active={/md/.test(route.extname)}>
                                  <Component
                                    {...props}
                                    {...appProps}
                                    {...route.props}
                                  />
                                </CenteredLayout>
                              </Catch>
                            )}
                          />
                        ))
                      )}
                    />
                  )}
                />
              </Catch>
            </ScopeProvider>
          </RebassProvider>
          {!disableScroll && <ScrollTop />}
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


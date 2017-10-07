import React from 'react'
import connect from 'refunk'
import Title from './Title'
import cxs from 'cxs/component'
import Router from '../lib/Router'

const { Route, Link } = Router

const dec = state => ({ count: state.count - 1 })
const inc = state => ({ count: state.count + 1 })

const Debug = props => <pre children={JSON.stringify(props, null, 2)} />

const Home = props => (
  <div>
    <h2>Home</h2>
  </div>
)

const css = `
*{box-sizing:border-box}
body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.5;
}
`

const Style = ({ css }) => (
  <style
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />
)


const App = connect(props => (
  <div>
    <title>Hi x0</title>
    <meta charSet='utf-8' />
    <Style css={css + (props.css || '')} />

    <Title>Hello async {props.count}</Title>
    <button
      onClick={e => props.update(dec)}
      children='-'
    />
    <button
      onClick={e => props.update(inc)}
      children='+'
    />
    <Router
      context={{}}
      basename={props.basename}
      location={props.pathname}>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/debug'>Debug</Link>
      </nav>
      <Route exact path='/'
        component={Home}
      />
      <Route path='/debug'
        render={() => <Debug {...props} />}
      />
    </Router>
  </div>
))

App.getInitialProps = async ({ Component, html, pathname }) => {
  const fetch = require('isomorphic-fetch')
  const endpoint = 'https://microbeats.now.sh/tracks'
  const microbeats = await fetch(endpoint)
  const tracks = await microbeats.json()
  const css = cxs.css()

  return { hello: 'hi', css, tracks }
}

export default App

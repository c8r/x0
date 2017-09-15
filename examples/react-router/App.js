import React from 'react'
import {
  BrowserRouter,
  StaticRouter,
  Route,
  Link
} from 'react-router-dom'
import cxs from 'cxs/component'

const Root = cxs('div')({
  padding: '48px'
})

const Heading = cxs('h1')({
  fontSize: '48px',
  margin: 0
})

const App = props => {
  const Main = typeof document !== 'undefined'
    ? BrowserRouter
    : StaticRouter

  return (
    <Main
      context={{}}
      location={props.pathname}>
      <Root>
        <Heading>Hello react-router</Heading>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
        </nav>
        <Route
          exact path='/'
          component={Home}
        />
        <Route
          path='/about'
          component={About}
        />
      </Root>
    </Main>
  )
}

const Home = () => <Heading>Home</Heading>
const About = () => <Heading>About</Heading>

export default App

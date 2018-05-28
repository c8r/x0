import React from 'react'
import { Link } from 'react-router-dom'

const routes = [
  { path: '/dynamic' },
  { path: '/dynamic/hello' },
  { path: '/dynamic/hi' },
]

export default class extends React.Component {
  static getInitialProps = async ({ path }) => {
    let title = 'dynamic'
    switch (path) {
      case '/dynamic/hello':
        title = 'hello'
        break
      case '/dynamic/hi':
        title = 'hi'
        break
    }
    return {
      routes,
      path: '/dynamic/:id*',
      title,
    }
  }

  render () {
    return <div>
      <pre>dynamic routing</pre>
      <Link to='/'>Home</Link>
      <Link to='/dynamic'>Dynamic Routes</Link>
      <Link to='/dynamic/hello'>Hello</Link>
      <Link to='/dynamic/hi'>Hi</Link>
    </div>
  }
}

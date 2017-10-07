import React from 'react'
import connect from 'refunk'
import cxs from 'cxs/component'
import pkg from '../package.json'
import Title from './Title'
import Style from './Style'
import Flex from './Flex'
import Box from './Box'

import Debug from './Debug'

const App = connect(props => (
  <div>
    <meta charSet='utf-8' />
    <title>{props.title}</title>
    <meta name='description' content={props.description} />
    <Style css={props.css} />
    <pre>Compositor</pre>
    <Title>x0</Title>
    <div>{pkg.description}</div>
    <div>v{pkg.version}</div>
    <pre>video</pre>
    <pre>tweet</pre>
    <pre>github</pre>
    <pre>
      - Isolated development environment
      - Static site generator
      - Hot reloading
      - Works with virtually any React component
      - No convoluted APIs to learn
      - No boilerplate required
      - Routing with react-router
      - Works with CSS-in-JS libraries like styled-components
      - Support for async data fetching
    </pre>
    <pre>Get Started</pre>
  </div>
))

App.getInitialProps = async ({ Component, html, pathname }) => {
  // const fetch = require('isomorphic-fetch')
  // const endpoint = 'https://microbeats.now.sh/tracks'
  // const microbeats = await fetch(endpoint)
  // const tracks = await microbeats.json()
  const css = cxs.css()

  return {
    css,
    // tracks
  }
}

export default App

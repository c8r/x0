import React from 'react'
import connect from 'refunk'
import Title from './Title'
import cxs from 'cxs/component'
import Router from '../lib/Router'
import Style from './Style'

const { Route, Link } = Router

const App = connect(props => (
  <div>
    <meta charSet='utf-8' />
    <title>{props.title}</title>
    <meta name='description' content={props.description} />
    <Style css={props.css} />
    <Title>x0</Title>
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

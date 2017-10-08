import React from 'react'
import connect from 'refunk'
import cxs from 'cxs/x'
import { Logo } from '@compositor/logo'
import pkg from '../package.json'
import Style from './Style'
import Flex from './Flex'
import Box from './Box'
import Container from './Container'
import Text from './Text'
import Caps from './Caps'
import Mono from './Mono'
import Pre from './Pre'
import BlockLink from './BlockLink'
import NavLink from './NavLink'
import Title from './Title'
import Video from './Video'
import Btn from './Btn'
import BtnOutline from './BtnOutline'
import Tweet from './Tweet'

const App = (props => [
  <meta charSet='utf-8' />,
  <title>{props.title}</title>,
  <meta name='description' content={props.description} />,
  <meta name='twitter:card' content='summary' />,
  <meta name='twitter:site' content='@getcompositor' />,
  <meta name='twitter:title' content='Compositor x0' />,
  <meta name='twitter:title' content={props.description} />,
  <meta name='twitter:image' content='https://compositor.io/logo/dist/compositor-black.png' />,
  <Style css={props.css} />,
  <Container>
    <nav>
      <Flex wrap align='center'>
        <BlockLink href='https://compositor.io'>
          <Flex ml={-1} align='center'>
            <Logo
              size={32}
              color='white'
              backgroundColor='black'
            />
            <Caps f='10px' fontWeight='600'>
              Compositor
            </Caps>
          </Flex>
        </BlockLink>
        <Box mx='auto' />
        <NavLink
          mr={1}
          href='https://github.com/c8r/x0'>
          GitHub
        </NavLink>
        <Tweet />
      </Flex>
    </nav>
    <header>
      <Box pt={4} pb={3}>
        <Title>x0</Title>
        <Text fontWeight='600' f={3} mb={2}>{pkg.description}</Text>
        <Mono f={0}>v{pkg.version}</Mono>
        {props.tracks && (
          <pre children={JSON.stringify(props.tracks)}/>
        )}
      </Box>
    </header>
    <main>
      <Box>
        <Video
          loop
          autoPlay
          src='demo.mp4'
        />
      </Box>
      <Box py={3}>
        <Pre f={1} color='cyan'>npm install @compositor/x0</Pre>
      </Box>
      <section id='features'>
        <Box py={4}>
          <Text f={4} mb={2} fontWeight='600'>Features</Text>
          <Flex wrap mx={-2}>
            {props.features.map(feat => (
              <Box
                key={feat}
                w={[ 1, 1/2, 1/2 ]}
                px={2}
                py={1}>
                <Text fontWeight='600'>
                  {feat}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </section>
      <section id='get-started'>
        <Box py={4}>
          <Text f={4} fontWeight='600'>Get Started</Text>
          <Text mb={3}>Read the docs and get started on GitHub or sign up for updates.</Text>
          <Btn mr={2} href='https://github.com/c8r/x0'>
            Documentation
          </Btn>
          <BtnOutline href='https://compositor.io/#sign-up'>
            Sign Up
          </BtnOutline>
        </Box>
      </section>
      <footer>
        <Flex pt={4} pb={3}>
          <Text f={0}>© 2017 Compositor, Inc.</Text>
        </Flex>
      </footer>
    </main>
  </Container>,
  <script
    dangerouslySetInnerHTML={{
      __html: scripts
    }}
  />
])

App.defaultProps = {
  features: [
    'Isolated development environment',
    'Static site generator',
    'Hot reloading',
    'Works with virtually any React component',
    'No convoluted APIs to learn',
    'No boilerplate required',
    'Routing with react-router',
    'Works with CSS-in-JS libraries like styled-components',
    'Support for async data fetching',
  ]
}

App.getInitialProps = async ({ Component, html, pathname }) => {
  const fetch = require('isomorphic-fetch')
  const endpoint = 'https://microbeats.now.sh/tracks'
  const microbeats = await fetch(endpoint)
  const tracks = await microbeats.json()

  const css = cxs.css()
  cxs.reset()

  return {
    hello: 'hi',
    css,
    tracks
  }
}

const scripts = `
window.twttr = (function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0],
t = window.twttr || {};
if (d.getElementById(id)) return t;
js = d.createElement(s);
js.id = id;
js.src = "https://platform.twitter.com/widgets.js";
fjs.parentNode.insertBefore(js, fjs);
t._e = [];
t.ready = function(f) {
t._e.push(f);
};
return t;
}(document, "script", "twitter-wjs"));
`

export default App

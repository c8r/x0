import React from 'react'
import connect from 'refunk'
import cxs from 'cxs/component'
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
import Title from './Title'

// import Debugger from './Debugger'

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
        <Flex align='center'>
          <BlockLink href='https://compositor.io'>
            <Flex align='center'>
              <Logo
                size={32}
                color='white'
                backgroundColor='black'
              />
              <Caps f={0}
                fontWeight='bold'
                ml={1}>
                Compositor
              </Caps>
            </Flex>
          </BlockLink>
          <Box mx='auto' />
          <BlockLink href='#!'>
            Tweet
          </BlockLink>
          <BlockLink ml={2} href='https://github.com/c8r/x0'>
            GitHub
          </BlockLink>
        </Flex>
      </nav>
      <header>
        <Box pt={4} pb={3}>
          <Title>x0</Title>
          <Text f={3}>{pkg.description}</Text>
          <Mono f={0}>v{pkg.version}</Mono>
        </Box>
      </header>
      <main>
        <Box p={256} bg='gray' children='video T/K' />
        <Box py={3}>
          <Pre color='cyan'>npm install @compositor/x0</Pre>
        </Box>
        <section id='features'>
          <Box py={4}>
            <Text f={4} mb={2} fontWeight='bold'>Features</Text>
            <Flex wrap mx={-2}>
              {props.features.map(feat => (
                <Box
                  key={feat}
                  w={[ 1, 1/2, 1/2 ]}
                  px={2}
                  py={1}>
                  <Text>
                    {feat}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>
        </section>
        <section id='get-started'>
          <Box py={4}>
            <Text f={4} fontWeight='bold'>Get Started</Text>
            <Text>Read the docs and get started on</Text>
            <a href='https://github.com/c8r/x0'>
              GitHub
            </a>
          </Box>
        </section>
        <footer>
          <Flex py={3}>
            <Text f={0}>© 2017 Compositor, Inc.</Text>
          </Flex>
        </footer>
      </main>
    </Container>
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

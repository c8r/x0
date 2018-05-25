import React from 'react'
import { connect } from 'refunk'

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
import Btn from './Btn'
import BtnOutline from './BtnOutline'
import Video from './Video'

const App = connect(props => <React.Fragment>
  <head>
    <title>{props.title}</title>
    <meta name='description' content={props.description} />
    <meta name='twitter:card' content='summary' />
    <meta name='twitter:site' content='@getcompositor' />
    <meta name='twitter:title' content='Compositor x0' />
    <meta name='twitter:description' content={props.description} />
    <meta name='twitter:image' content='https://compositor.io/logo/dist/compositor-black.png' />
    <Style />
  </head>
  <Container>
    <nav>
      <Flex wrap align='center'>
        <BlockLink href='https://compositor.io'>
          <Flex ml={-1} align='center'>
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
      </Flex>
    </nav>
    <header>
      <Box pt={4} pb={3}>
        <Title>x0</Title>
        <Text fontWeight='600' f={3} mb={2}>{pkg.description}</Text>
        <Mono f={0}>v{pkg.version}</Mono>
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
        <Pre f={1}>npm install @compositor/x0</Pre>
      </Box>
      <section id='get-started'>
        <Box py={4}>
          <Text f={4} fontWeight='600'>Get Started</Text>
          <Text mb={3}>Read the docs and get started on GitHub or sign up for updates.</Text>
          <Btn mr={2} href='https://github.com/c8r/x0'>
            Documentation
          </Btn>
        </Box>
      </section>
      <footer>
        <Flex pt={4} pb={3}>
          <Text f={0}>© 2017 Compositor, Inc.</Text>
        </Flex>
      </footer>
    </main>
  </Container>
</React.Fragment>)

App.getInitialProps = async (props) => {
  return {
    hello: 'hi',
  }
}

export default App

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Container,
  Box,
  Flex,
  Caps,
  Heading,
  Text,
  Button,
  Pre,
} from 'rebass'
import { Logo } from '@compositor/logo'

const Video = styled.video([], {
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '16px',
})

export default class extends React.Component {
  static defaultProps = {
    name: 'Home',
    layout: 'landing'
  }

  render () {
    return (
      <React.Fragment>
        <Container py={5}>
          <Box mb={3}>
            <Video
              autoPlay
              loop
              muted
              playsInline
              poster='hello-x0.gif'
              src='hello-x0.mp4'
            />
          </Box>
          <Heading
            is='h1'
            mb={4}
            lineHeight={1.125}
            fontWeight='bold'
            fontSize={[ 4, 5, 6 ]}>
            x0:
            Document & develop React components without breaking a sweat
          </Heading>
          <Pre>npm i -g @compositor/x0</Pre>
          <Flex py={4}>
            <Button
              is='a'
              px={4}
              py={3}
              bg='black'
              href='https://github.com/c8r/x0'>
              GitHub
            </Button>
            <Box mx={1} />
            <Button
              is={Link}
              px={4}
              py={3}
              bg='black'
              to='/getting-started'>
              Documentation
            </Button>
          </Flex>
        </Container>
      </React.Fragment>
    )
  }
}

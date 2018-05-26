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

// <Link to='/'>Home</Link>
// <Link to='/docs'>Documentation</Link>

export default class extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Container py={5}>
          <Flex
            mb={4}
            alignItems='center'>
            <Logo size={32} />
            <Caps fontWeight='bold'>
              Compositor
            </Caps>
          </Flex>
          <Heading is='h1'
            mb={2}
            fontSize={[ 5, 6, 7 ]}>
            x0
          </Heading>
          <Text
            mb={4}
            fontWeight='bold'
            fontSize={4}>
            Zero-config React development environment & static site generator
          </Text>
          <Box mb={4}>
            <Video
              autoPlay
              loop
              muted
              playsInline
              poster='demo.gif'
              src='demo.mp4'
            />
          </Box>
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
              to='/docs'>
              Documentation
            </Button>
          </Flex>
          <Flex py={4} mt={5}>
            <Text fontSize={0}>
              © 2018 Compositor, Inc. All rights reserved
            </Text>
          </Flex>
        </Container>
      </React.Fragment>
    )
  }
}

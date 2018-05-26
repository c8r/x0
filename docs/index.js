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
  render () {
    return (
      <React.Fragment>
        <Container py={5}>
          <Heading
            is='h1'
            mb={4}
            lineHeight={1.125}
            fontWeight='bold'
            fontSize={[ 4, 5, 6 ]}>
            x0: Zero-config React development environment & static site generator
          </Heading>
          <Box mb={4}>
            <Video
              autoPlay
              loop
              muted
              playsInline
              poster='hello-x0.gif'
              src='hello-x0.mp4'
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
        </Container>
      </React.Fragment>
    )
  }
}

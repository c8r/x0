import React from 'react'
import {
  Provider,
  Flex,
  Box,
  Text,
  Caps,
  BlockLink,
} from 'rebass'
import { Link } from 'react-router-dom'
import { Logo } from '@compositor/logo'
import theme from './theme'

export default ({ render }) =>
  <Provider theme={theme}>
    <Flex alignItems='center'>
      <BlockLink
        href='https://compositor.io'>
        <Flex px={1} py={2} alignItems='center'>
          <Logo size={32} />
          <Caps fontWeight='bold'>
            Compositor
          </Caps>
        </Flex>
      </BlockLink>
      <Box mx='auto' />
      <BlockLink px={3} is={Link} to='/'>
        <Caps fontWeight='bold'>
          x0
        </Caps>
      </BlockLink>
      <BlockLink px={3} href='https://github.com/c8r/x0'>
        <Caps fontWeight='bold'>
          GitHub
        </Caps>
      </BlockLink>
    </Flex>
    {render()}
  </Provider>

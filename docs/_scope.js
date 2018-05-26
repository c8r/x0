import React from 'react'
import styled from 'styled-components'
import * as Rebass from 'rebass'
import { heading, link } from '@compositor/md'

const Pre = styled(Rebass.Pre)({
  borderRadius: '8px'
})

export default {
  ...Rebass,
  h1: heading(props =>
    <Rebass.Heading
      {...props}
      is='h1'
      fontSize={6}
      mt={3}
    />),
  h2: heading(props =>
    <Rebass.Heading
      {...props}
      is='h2'
      fontSize={5}
      mt={3}
    />),
  h3: heading(props =>
    <Rebass.Heading
      {...props}
      is='h3'
      fontSize={4}
      mt={2}
    />),
  a: link(props =>
    <Rebass.Link
      {...props}
    />
  ),
  pre: props =>
    <Pre
      {...props}
      p={3}
      bg='#f6f6f6'
    />
}

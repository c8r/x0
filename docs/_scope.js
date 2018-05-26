import React from 'react'
import * as Rebass from 'rebass'
import { heading } from '@compositor/md'

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
  pre: props =>
    <Rebass.Pre
      {...props}
      p={3}
    />
}

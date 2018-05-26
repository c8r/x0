import React from 'react'
import {
  Container
} from 'rebass'
import styled from 'styled-components'
import Readme from '../README.md'
import scope from './_scope'

const Prose = styled.div([], {
  '& img': {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
  },
  '& .demo-image, & a[href="LICENSE/"]': {
    display: 'none'
  }
})

export default props =>
  <Container py={5}>
    <Prose>
      <Readme
        scope={scope}
      />
    </Prose>
  </Container>

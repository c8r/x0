import React from 'react'
import * as scope from 'rebass'
import { ScopeProvider } from '../src'
import {
  Flex,
  Box,
  Container,
} from 'rebass'

export default class App extends React.Component {
  static defaultProps = {
    title: 'Hello'
  }

  render () {
    const { render } = this.props
    console.log('custom app', this.props.routes)

    return (
      <ScopeProvider scope={scope}>
        <Flex>
          {false && (
            <Box p={2} flex='none' width={192}>
              custom app
            </Box>
          )}
          <Box width={1} p={3}>
            <Container maxWidth={768}>
              {render()}
            </Container>
          </Box>
        </Flex>
      </ScopeProvider>
    )
  }
}

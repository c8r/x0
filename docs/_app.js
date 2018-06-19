import React from 'react'
import * as scope from 'rebass'
import { Link } from 'react-router-dom'
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
    const { routes, route, render } = this.props
    console.log('custom app', routes)
    console.log('route', route)

    return (
      <ScopeProvider scope={scope}>
        <Flex>
          {true && (
            <Box p={2} flex='none' width={192}>
              <ul>
                {routes.map(route => (
                  <li key={route.key}>
                    <Link to={route.href}>
                      {route.name} <code>({route.path})</code>
                    </Link>
                  </li>
                ))}
              </ul>
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

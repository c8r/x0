import React from 'react'
import * as scope from 'rebass'
import { Link } from 'react-router-dom'
import { ScopeProvider } from '../components'
import {
  Flex,
  Box,
  Container,
} from 'rebass'
import Layout from './_layout'

export default class App extends React.Component {
  static defaultProps = {
    title: 'Hello'
  }

  render () {
    const { routes, route, render } = this.props

    // return render()

    return (
      <ScopeProvider scope={scope}>
        {false ? (
          <Layout>
            {render()}
          </Layout>
        ) : (
          <Flex>
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
            <Box width={1} p={3}>
              <Container maxWidth={768}>
                {render()}
              </Container>
            </Box>
          </Flex>
        )}
      </ScopeProvider>
    )
  }
}

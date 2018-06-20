import React from 'react'
import * as scope from 'rebass'
import { Link } from 'react-router-dom'
import { ScopeProvider, SidebarLayout } from '../components'
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
    const {
      routes,
      route,
      children,
      // alternative to props.children
      Component,
      render,
    } = this.props

    // built-in layout test
    if (true) {
      // const logo = <div style={{ width: 32, height: 32, backgroundColor: 'tomato' }} />
      return (
        <ScopeProvider scope={scope}>
          <SidebarLayout {...this.props} />
        </ScopeProvider>
      )
    }


    return (
      <ScopeProvider scope={scope}>
        {false ? (
          <Layout>
            {children}
          </Layout>
        ) : (
          <Flex>
            <Box p={2} flex='none' width={192}>
              <ul>
                {routes.map(route => (
                  <li key={route.key}>
                    <Link to={route.href}>
                      {route.name} <code>({route.dirname})</code>
                    </Link>
                  </li>
                ))}
              </ul>
            </Box>
            <Box width={1} p={3}>
              <Container maxWidth={768}>
                {children}
              </Container>
            </Box>
          </Flex>
        )}
      </ScopeProvider>
    )
  }
}

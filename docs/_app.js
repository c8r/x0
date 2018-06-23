import React from 'react'
import * as scope from 'rebass'
import { Link } from 'react-router-dom'
import { ScopeProvider, SidebarLayout } from '../components'
import {
  Provider as RebassProvider,
  Flex,
  Box,
  Container,
} from 'rebass'
import sortBy from 'lodash.sortby'

import LandingLayout from './_layout'
import theme from './_theme'

const navOrder = [
  'index',
  'getting-started',
  'markdown',
  'react',
  'mdx',
  'custom-app',
  'routing',
  'front-matter',
  'fetching-data',
  'components',
  'customizing',
  'cli-options',
  'exporting',
  'examples',
]

const sortRoutes = routes => [
  ...sortBy([...routes], a => {
    const i = navOrder.indexOf(a.name)
    return i < 0 ? Infinity : i
  })
].map(route => {
  if (route.name !== 'index') return route
  return {
    ...route,
    name: 'Home'
  }
})

export default class App extends React.Component {
  static defaultProps = {
    title: 'x0'
  }

  render () {
    const {
      routes,
      route,
      children,
    } = this.props
    const { layout } = (route && route.props) || {}

    const Layout = layout === 'landing'
      ? LandingLayout
      : SidebarLayout

    const nav = sortRoutes(routes)

    return (
      <ScopeProvider scope={scope}>
        <RebassProvider theme={theme}>
          <Layout
            {...this.props}
            routes={nav}
          />
        </RebassProvider>
      </ScopeProvider>
    )
  }
}

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

import LandingLayout from './_layout'
import theme from './_theme'

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

    return (
      <ScopeProvider scope={scope}>
        <RebassProvider theme={theme}>
          <Layout {...this.props} />
        </RebassProvider>
      </ScopeProvider>
    )
  }
}

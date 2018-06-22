import React from 'react'
import * as scope from 'rebass'
import { Link } from 'react-router-dom'
import { ScopeProvider, SidebarLayout } from '../components'
import {
  Flex,
  Box,
  Container,
} from 'rebass'

import LandingLayout from './_layout'

export default class App extends React.Component {
  static defaultProps = {
    title: 'Hello'
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
        <Layout {...this.props} />
      </ScopeProvider>
    )
  }
}

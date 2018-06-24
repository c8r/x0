
# Custom App Component

Use a custom App component to completely customize the layout, add context providers, use global state, or set a custom scope.

## Layouts

Create a file named `_app.js` to provider a custom App component to x0.
This file can be used for custom layouts, including headers, footers, and navigation.

```jsx
// _app.js
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Toolbar,
  NavLink
} from 'rebass'

export default class extends React.Component {
  render () {
    const { children } = this.props
    return (
      <React.Fragment>
        <Toolbar>
          <NavLink is={Link} to='/'>
            Home
          </NavLink>
        </Toolbar>
        <Container>
          {children}
        </Container>
      </React.Fragment>
    )
  }
}
```

## Providers

Context providers, such as styled-component's `ThemeProvider` can be included in a custom app.

```jsx
import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../src/theme'

export default props =>
  <ThemeProvider theme={theme}>
    <React.Fragment>
      {props.children}
    </React.Fragment>
  </ThemeProvider>
```

## Scope

Use the x0 `ScopeProvider` to customize the components used when rendering markdown elements in `.md` or `.mdx` files.
The `ScopeProvider` also provides scope to [live code examples](markdown/#code-fences) in code fences.

```jsx
import React from 'react'
import { ScopeProvider } from '@compositor/x0/components'
import * as scope from '../src'

export default props =>
  <ScopeProvider scope={scope}>
    {props.children}
  </ScopeProvider>
```

## App State

Global application state can also be provided in a custom App.
Use `props.Component` instead of `props.children` to pass props to the rendered route.

```jsx
import React from 'react'

export default class extends React.Component {
  state = {
    count: 0
  }

  update = fn => this.setState(fn)

  render () {
    const { Component } = this.props

    return (
      <Component
        {...this.state}
        update={this.update}
      />
    )
  }
}
```

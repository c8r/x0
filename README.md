
# x0

Zero-config React development environment and static site generator

https://compositor.io/x0

```sh
npm install @compositor/x0
```

## Features

- Hot-loading development environment
- Works with virtually any React component\*
- No convoluted APIs
- Renders static HTML
- Renders JS bundles
- Use any CSS-in-JS library
- Routing with [react-router][react-router]
- Async data fetching

\* Components cannot rely on bundler features like webpack loaders


## Isolated development environment

```sh
x0 dev src/App.js
```

Options:

```
  -o --open   Open dev server in default browser
  -p --port   Set custom port for dev server
```

```sh
x0 dev src/App.js -op 8080
```


## Static Render

Render static HTML and client-side bundle

```sh
x0 build src/App.js --out-dir site
```

Render static HTML without bundle

```sh
x0 build src/App.js --out-dir site --static
```

Options

```
  -d --out-dir    Directory to save index.html and bundle.js to
  -s --static     Only render static HTML (no client-side JS)
```

## Fetching Data

Use the `getInitialProps` static method to fetch data for static rendering.
This method was inspired by [Next.js][nextjs] but only works for static rendering.

```jsx
const App = props => (
  <h1>Hello {props.data}</h1>
)

App.getInitialProps = async ({
  Component,
  html,
  pathname
}) => {
  const fetch = require('isomorphic-fetch')
  const res = await fetch('http://example.com/data')
  const data = await res.json()

  return { data }
}
```

## CSS-in-JS

x0 supports server-side rendering for styled-components, glamor, and glamorous.
To enable CSS rendering for static output, use the `cssLibrary` option

## Head content

Head elements such as `<title>`, `<meta>`, and `<style>` can be rendered at the beginning of a component.
Browsers should handle this correctly since the `<head>` and `<body>` elements are optional in HTML 5.

```jsx
const App = props => (
  <React.Fragment>
    <title>Hello x0</title>
    <style dangerouslySetInnerHTML={{
      __html: 'body{font-family:-apple-system,BlinkMacSystemFont,sans-serif}'
    }} />
    <h1>Hello x0</h1>
  </React.Fragment>
)
```


## Configuration

Default props can be passed to x0 in a `package.json` field named `x0`.

```json
"x0": {
  "title": "Hello",
  "count": 0
}
```

## Routing

To render multiple pages and use routing, add a `routes` array to the `package.json` configuration object.

```json
"x0": {
  "routes": [
    "/",
    "/about"
  ]
}
```

```sh
x0 static src/App.js --out-dir site
```

<!--
For easier integration with [react-router][react-router], use the x0 Router component, which handles universal rendering.

```jsx
import React from 'react'
import Router from '@compositor/x0/Router'
import { Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'

const App = props => (
  <Router
    basename={props.basename}
    location={props.pathname}>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
    </nav>
    <Route
      exact
      path='/'
      render={() => <Home {...props} />}
    />
    <Route
      path='/about'
      render={() => <About {...props} />}
    />
  </Router>
)
```

-->

[Made by Compositor](https://compositor.io/)
|
[MIT License](LICENSE.md)

[nextjs]: https://github.com/zeit/next.js
[react-router]: https://github.com/ReactTraining/react-router
[sc]: https://github.com/styled-components/styled-components


# x0

Zero-config React renderer and CLI

```sh
npm install @compositor/x0
```

## Features

- Hot-loading development environment
- Works with any React component\*
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

Use the `getInitialProps` static method to precompile CSS from css-in-js libraries such as [styled-components][sc]

```jsx
// CXS
import React from 'react'
import cxs from 'cxs/component'

const Heading = cxs('h1')({
  color: 'tomato'
})

const App = props => (
  <div>
    <style
      dangerouslySetInnerHTML={{
        __html: props.css
      }}
    />
    <Heading>Hello</Heading>
  </div>
)

App.getInitialProps = async () => {
  const css = cxs.css()
  return { css }
}
```

```jsx
// styled-components
import React from 'react'
import styled from 'styled-components'

const Heading = styled.h1`
  color: tomato;
`

const App = props => [
  props.styles && (
    <head
      dangerouslySetInnerHTML={{
        __html: props.styles
      }}
    />
  ),
  <div>
    <Heading>Hello</Heading>
  </div>
]

App.getInitialProps = async ({
  Component,
  props
}) => {
  const { ServerStyleSheet } = require('styled-components')
  const sheet = new ServerStyleSheet()
  sheet.collectStyles(<Component {...props} />)
  const styles = sheet.getStyleTags()
  return { styles }
}
```

## Routing

## Head content

Head elements such as `<title>`, `<meta>`, and `<style>` can be rendered at the beginning of a component.
Browsers will handle this correctly since the `<head>` and `<body>` elements are optional in HTML 5.

```jsx
const App = props => (
  <div>
    <title>Hello x0</title>
    <style dangerouslySetInnerHTML={{
      __html: 'body{font-family:-apple-system,BlinkMacSystemFont,sans-serif}'
    }} />
    <h1>Hello x0</h1>
  </div>
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

## Rendering Multiple Pages

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

MIT License

[nextjs]: https://github.com/zeit/next.js
[react-router]: https://github.com/ReactTraining/react-router
[sc]: https://github.com/styled-components/styled-components

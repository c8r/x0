
# x0

Zero-config React renderer and CLI

```sh
npm install @compositor/x0
```

## Features

- Hot-loading development environment
- Renders static HTML
- Renders JS bundles
- Use any CSS-in-JS library
- Works with any React component *

* Components cannot rely on bundler features like webpack loaders


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

Render a static HTML page

```sh
x0 build src/App.js > site/index.html
```

Render a static page with client-side bundle

```sh
x0 build src/App.js --out-dir site
```

Render with a custom root HTML component to control CSS, routing, etc.

```
x0 build src/App.js --html src/Html.js
```

Options

```
  -h --html       Root HTML component
  -d --out-dir    Directory to save index.html and bundle.js to
  -s --static     Only render static HTML (no client-side JS)
```

## Custom Root HTML Component

To handle things like routing and CSS-in-JS libraries, use a custom HTML component.
When an HTML component isn't specified as an option, X0 uses a default HTML component.
This same component can be imported and customized via props.

```jsx
// custom root HTML component
import React from 'react'
import { Html } from 'x0'
import cxs from 'cxs'

const Root = props => {
  // get static CSS string from rendered app
  const css = cxs.css()

  return (
    <Html
      {...props}
      css={css}
    />
  )
}

export default Root
```

The `Html` component accepts the following props.

- `title`
- `description`
- `image`
- `css`
- `js`
- `stylesheets` (array)
- `scripts` (array)
- `initialProps` (object)
- `children`

## Configuration

Other configuration options can be passed to x0 in a `package.json`
field named `x0`.

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

In your main app component, use a library like react-router to handle the routes.
When rendering statically, the path will be passed to both the app component and the root HTML component as the `pathname` prop.

```jsx
// main app component
import React from 'react'
import { BrowserRouter } from 'react-router'

const App = props => (
  <BrowserRouter>
    {/* ...handle child routes */}
  </BrowserRouter>
)
```

```jsx
// root component
import React from 'react'
import { StaticRouter } from 'react-router'
import { Html } from '@compositor/x0'

const Root = props => (
  <StaticRouter location={props.pathname}>
    <Html {...props} />
  </StaticRouter>
)
```

```sh
x0 static src/App.js --html src/Root.js --out-dir site
```

MIT License


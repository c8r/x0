
# x0

React dev environment, static-site generator, and bundler

```sh
npm install @compositor/x0
```

## Features

- Hot-loading development environment
- Renders static HTML
- Renders JS bundles
- Use any CSS-in-JS library
- Works with any React component *

* Components should not rely on bundler features like webpack loaders


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
x0 build src/App.js > docs/index.html
```

Render a static page with client-side bundle

```sh
x0 build src/App.js --out-dir docs
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


## Configuration

Other configuration options can be passed to x0 in a `package.json`
field named `x0`.

```json
"x0": {
  "title": "Hello",
  "count": 0
}
```

MIT License

---

To do:

- [ ] render multiple routes
  - [ ] readdir
  - [ ] configuration `options.pages`
  - User configures routing in App – ssr/static props for current pathname hydration

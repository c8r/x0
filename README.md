
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

Render a static HTML page with client-side JS bundle

```sh
x0 build src/App.js
```

Render with a custom root HTML component to control CSS, routing, etc.

```
x0 build src/App.js --html src/Html.js
```

Options

```
  -d --out-dir    Directory to save index.html and bundle.js to
  -s --static     Only render static HTML (no client-side JS)
```


## Render Multiple Pages

```sh
x0 build src/pages/ --out-dir docs/
```

### Configuration

In `package.json`

```json
"x0": {
  "title": "Hello",
  "props": {
    "count": 0
  }
}
```

MIT License

---

To do:

- [ ] render multiple routes
  - [ ] readdir
  - [ ] configuration `options.pages`
  - User configures routing in App – ssr/static props for current pathname hydration

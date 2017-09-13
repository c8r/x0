
# rx0

React dev environment, static-site generator, and bundler

```sh
npm install rx0
```

## Features

- Hot-loading development environment
- Renders static HTML
- Renders JS bundles
- Use any CSS-in-JS library
- Works with any React component *

* Components should not rely on bundler features like webpack loaders

### Isolated development environment

```sh
rx0 dev src/Component.js
```

Options:
- open
- port


### Static Render

```sh
rx0 static src/App.js
```

Render with a custom root HTML component to control CSS, routing, etc.

```
rx0 static src/App.js src/Html.js
```

Options
- out-dir
- client-bundle


### Configuration

In `package.json`

```json
"rx0": {
  "title": "Hello",
  "props": {
    "count": 0
  }
}
```

MIT License

---

To do:

- [x] pass component
- [x] CLI
- [x] test hot loading
- [x] test outside dir
- [x] render static
- [x] render static callback

- [x] render json
- [x] rehydrate from json
- [x] render bundle
- [x] rehydrate from json
- [x] out-dir option
- [ ] render css (yikes)

- [x] configurable (props) html render
- [x] default html render
- [x] merge options with package.json
- [x] update-notifier
- [ ] render multiple routes
  - [ ] readdir
  - [ ] configuration `options.pages`
  - User configures routing in App – ssr/static props for current pathname hydration

---

```js
pages: [
  {
    path: '/',
    component: 'docs/App.js',
    props: {}
  }
]
```

```sh
io
iox
ion
r0
rex
```


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
rx0 static src/App.js src/Html.js
```

Options
- css lib?
- out-dir
- client-bundle
- json props


MIT License

---

To do:

- [x] pass component
- [x] CLI
- [x] test hot loading
- [x] test outside dir
- [x] render static
- [x] render static callback

- [ ] render css (yikes)
- [x] render json
- [x] rehydrate from json
- [ ] out-dir option
- [ ] render bundle
- [ ] rehydrate from json

- [x] configurable (props) html render
- [x] default html render
- [x] merge options with package.json
- [ ] render multiple routes
- [ ] react router
- [ ] update-notifier

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


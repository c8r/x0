
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

### Static Render

```sh
rx0 static src/App.js
```


MIT License

---

To do:

- [x] pass component
- [x] CLI
- [x] test hot loading
- [x] test outside dir
- [x] render static
- [ ] render static callback
- [ ] returns html/css/json/bundle
- [ ] render bundle
- [ ] rehydrate from json
- [ ] configurable html render
- [ ] default html render
- [ ] merge with package.json
- [ ] render multiple routes
- [ ] react router
- [ ] update-notifier

---


Render static with css lib

```sh
rx0 static src/App.js src/Html.js
```


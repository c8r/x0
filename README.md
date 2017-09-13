
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
- [ ] render json
- [ ] rehydrate from json
- [ ] render bundle
- [ ] rehydrate from json

- [ ] configurable (props) html render
- [x] default html render
- [ ] merge options with package.json
- [ ] render multiple routes
- [ ] react router
- [ ] update-notifier



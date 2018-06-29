
# x0 jsx example

Use Compositor JSX format for pages

```sh
npm install
```

## Dev Server

```sh
npm start
```

## Build

```sh
npm run build
```

## Example JSX

Compositor JSX format is pure JSX with no JS wrapping and support for front matter.

```jsx
---
title: Hello
---
import { Box } from 'rebass'

<Box p={4}>
  <h1>{frontMatter.title}</h1>
</Box>
```

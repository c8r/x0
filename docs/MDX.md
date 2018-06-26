
# Using MDX

x0 also supports [MDX][mdx] format out of the box.
MDX allows you to mix markdown syntax with JSX to render React components.

```mdx
---
title: MDX Example
---
import { Box } from 'rebass'

# Hello

<Box p={3} bg='tomato'>
  Beep
</Box>
```

[mdx]: https://github.com/mdx-js/mdx

import React from 'react'
import { Html } from 'rx0'

const css = `*{box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;margin:0}`

const Root = props => (
  <Html
    {...props}
    title='x0 HTML'
    css={css}
  />
)

export default Root

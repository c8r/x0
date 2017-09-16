import React from 'react'
import { Html } from 'rx0'
import cxs from 'cxs'

const basecss = `*{box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;margin:0}`

const Root = props => {
  const css = basecss + cxs.css()

  return (
    <Html
      {...props}
      title='x0 CXS'
      css={css}
    />
  )
}

export default Root

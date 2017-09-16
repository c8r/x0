import React from 'react'
import { Html } from '@compositor/x0'

const css = `*{box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;margin:0}`

const Root = props => {

  return (
    <Html
      {...props}
      title='x0 react-router'
      css={css}
    />
  )
}

export default Root

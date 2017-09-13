import React from 'react'
import Html from '../lib/Html'
import cxs from 'cxs'

const Root = props => {
  const css = cxs.css()

  return (
    <Html
      {...props}
      css={css}
    />
  )
}

export default Root

import React from 'react'
import Html from '../lib/Html'
import cxs from 'cxs'

const Root = ({
  children
}) => {
  const css = cxs.css()

  return (
    <Html css={css}>
      {children}
    </Html>
  )
}

export default Root

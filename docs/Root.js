import React from 'react'
import cxs from 'cxs'

const Root = ({
  children
}) => {
  const css = cxs.css()

  return (
    <html>
      <style
        dangerouslySetInnerHTML={{
          __html: css
        }}
      />
      <div
        id='app'
        dangerouslySetInnerHTML={{
          __html: children
        }}
      />
    </html>
  )
}

export default Root

import React from 'react'

const Style = ({ css = '' }) => (
  <style
    dangerouslySetInnerHTML={{
      __html: base + css
    }}
  />
)

const base = `
*{box-sizing:border-box}
:root {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.5;
  min-height: 100vh;
  color: #000;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
}
`

export default Style

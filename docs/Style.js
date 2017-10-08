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
body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.5;
  min-height: 100vh;
  color: white;
  background-color: black;
  -webkit-font-smoothing: antialiased;
}
`

export default Style

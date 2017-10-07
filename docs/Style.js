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
  color: white;
  background-color: black;
  min-height: 100vh;
}
`

export default Style

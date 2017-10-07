import React from 'react'
import { createProvider } from 'refunk'
import Title from './Title'
import cxs from 'cxs/component'

const dec = state => ({ count: state.count - 1 })
const inc = state => ({ count: state.count + 1 })

const Debug = props => <pre children={JSON.stringify(props, null, 2)} />

const css = `
*{box-sizing:border-box}
body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.5;
}
`

const Style = ({ css }) => (
  <style
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />
)

const App = createProvider()(props => (
  <div>
    <title>Hi x0</title>
    <meta charSet='utf-8' />
    <Style css={css + (props.css || '')} />

    <Title>Hello {props.count}</Title>
    <button
      onClick={e => props.update(dec)}
      children='-'
    />
    <button
      onClick={e => props.update(inc)}
      children='+'
    />
    <Debug {...props} />
  </div>
))

App.renderStatic = ({ Component, html, props }) => {
  const css = cxs.css()
  return { hello: 'hi', css }
}

export default App

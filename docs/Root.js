import React from 'react'
import connect from 'refunk'
import styled from 'styled-components'
import glamorous from 'glamorous'
import { color } from 'styled-system'

const SCHeading = styled('h1')([], {
  fontFamily: 'sans-serif',
  fontSize: 48
}, color)

const GHeading = glamorous('h1')({
  fontFamily: 'sans-serif',
  fontSize: 48,
  color: 'tomato'
})

const inc = s => ({ count: s.count + 1 })

const Root = connect(props => (
  <React.Fragment>
    <title key='title'>Hello {props.count}</title>
    <meta name='viewport' content='width=device-width,initial-scale=1' />
    <meta name='description' content='Description for this page' />
    <SCHeading color='tomato'>Hello {props.count}</SCHeading>
    <button
      onClick={e => props.update(inc)}
      children='+'
    />
  </React.Fragment>
))

Root.defaultProps = {
  count: 0
}

const Script = ({ children }) => <script
  dangerouslySetInnerHTML={{
    __html: children
  }}
/>

export default Root

import React from 'react'
import cxs from 'cxs/component'

const Root = cxs('div')({
  padding: '48px'
})

const Heading = cxs('h1')({
  fontSize: '48px',
  margin: 0
})

const Button = cxs('button')(props => ({
  display: 'inline-block',
  fontFamily: 'inherit',
  fontSize: '14px',
  paddingTop: '6px',
  paddingBottom: '6px',
  paddingLeft: '12px',
  paddingRight: '12px',
  border: 0,
  borderRadius: '4px',
  color: 'white',
  backgroundColor: props.color,
  WebkitAppearance: 'none'
}))

Button.defaultProps = {
  color: '#07c'
}

const App = props => (
  <Root>
    <Heading>Hello CXS</Heading>
    <Button>
      Beep
    </Button>
  </Root>
)

export default App

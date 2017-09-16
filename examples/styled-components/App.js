import React from 'react'
import styled from 'styled-components'

const Root = styled('div')([], {
  padding: '48px'
})

const Heading = styled('h1')([], {
  fontSize: '48px',
  margin: 0
})

const Button = styled('button')([], props => ({
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
    <Heading>Hello styled-components</Heading>
    <Button>
      Beep
    </Button>
  </Root>
)

export default App

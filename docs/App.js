import React from 'react'
import cxs from 'cxs/component'

const Title = cxs('h1')({
  color: 'tomato'
})

const App = props => (
  <Title>
    Hello
  </Title>
)

export default App

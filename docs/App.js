import React from 'react'
import cxs from 'cxs/component'
import { createProvider } from 'refunk'

const Title = cxs('h1')({
  color: 'tomato'
})

const dec = state => ({ count: state.count - 1 })
const inc = state => ({ count: state.count + 1 })

const Debug = props => <pre children={JSON.stringify(props, null, 2)} />

const App = props => (
  <div>
    <Title>
      Hello {props.count}
    </Title>
    <Debug {...props} />
    <button
      onClick={e => props.update(dec)}
      children='-'
    />
    <button
      onClick={e => props.update(inc)}
      children='+'
    />
  </div>
)

export default createProvider({})(App)

import React from 'react'
import { createProvider } from 'refunk'

const dec = state => ({ count: state.count - 1 })
const inc = state => ({ count: state.count + 1 })

const App = props => (
  <div>
    <h1>hi Hello {props.count}</h1>
    <button onClick={e => props.update(dec)}>
      -
    </button>
    <button onClick={e => props.update(inc)}>
      +
    </button>
  </div>
)

export default createProvider()(App)

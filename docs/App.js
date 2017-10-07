import React from 'react'
import { createProvider } from 'refunk'
import Title from './Title'
// import { Head } from '../lib'

const dec = state => ({ count: state.count - 1 })
const inc = state => ({ count: state.count + 1 })

const Debug = props => <pre children={JSON.stringify(props, null, 2)} />

const App = props => (
  <div>
    <title>Hello x0</title>
    <meta charSet='utf-8' />
    <style>{`body{background-color:gray}`}</style>
    <Title>
      Hello {props.count}
    </Title>
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
)

export default createProvider({})(App)

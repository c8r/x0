import React from 'react'

export default class Catch extends React.Component {
  static getDerivedStateFromProps (props, state) {
    if (!state.err) return null
    return { err: null }
  }

  state = {
    err: null
  }

  componentDidCatch (err) {
    this.setState({ err })
  }

  render () {
    const { err } = this.state

    if (err) {
      return (
        <pre
          children={err.toString()}
          style={{
            color: 'white',
            backgroundColor: 'red',
            fontFamily: 'Menlo, monospace',
            fontSize: '14px',
            margin: 0,
            padding: '16px',
            minHeight: '128px',
            whiteSpace: 'prewrap'
          }}
        />
      )
    }

    return this.props.children
  }
}

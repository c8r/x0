import React from 'react'

export default class App extends React.Component {
  state = {
    count: 32,
  }

  update = fn => this.setState(fn)

  componentDidMount () {
    console.log('_app mount')
  }
  componentWillUnmount () {
    console.log('_app unmount')
  }

  render () {
    const { Component, ...props } = this.props
    if (!Component) {
      return (
        <pre>no match</pre>
      )
    }
    return (
      <Component
        {...props}
        {...this.state}
        update={this.update}
      />
    )
  }
}

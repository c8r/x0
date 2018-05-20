import React from 'react'

export default class App extends React.Component {
  state = {
    count: 32,
  }

  update = fn => this.setState(fn)

  render () {
    const { render, ...props } = this.props
    return render({
      // ...props,
      ...this.state,
      update: this.update
    })
  }
}

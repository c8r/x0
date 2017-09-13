const React = require('react')
const h = React.createElement

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      Component: props.Component
    }
  }

  render () {
    const { Component } = this.state

    return h(Component, this.props)
  }
}

module.exports = App

const React = require('react')
const h = React.createElement
const Catch = require('./Catch')

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      Component: props.Component
    }
  }

  render () {
    const { Component } = this.state

    return h(Catch, null,
      h(Component, this.props)
    )
  }
}

module.exports = App

const React = require('react')
const h = React.createElement
const Catch = require('./Catch')

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      Component: props.Component,
      initialProps: null
    }

    // CORS
    this.getProps = async (func) => {
      try {
        const initialProps = await func(props)
        this.setState({ initialProps })
      } catch (err) {
        this.setState({ err })
      }
    }

    if (typeof props.Component.getInitialProps === 'function') {
      this.getProps(props.Component.getInitialProps)
    }
  }

  render () {
    const { Component, initialProps } = this.state

    return h(Catch, null,
      h(Component, Object.assign({}, this.props, initialProps))
    )
  }
}

module.exports = App

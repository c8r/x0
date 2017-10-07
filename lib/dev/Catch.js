const React = require('react')

class Catch extends React.Component {
  constructor () {
    super()

    this.state = {
      err: null
    }
  }

  componentDidCatch (err) {
    console.error(err)
    this.setState({ err })
  }

  componentWillReceiveProps (next) {
    this.setState({ err: null })
  }

  render () {
    if (this.state.err) {
      return React.createElement('pre', {
        style: {
          fontFamily: '"Roboto Mono", Menlo, monospace',
          whiteSpace: 'pre-wrap',
          padding: 32,
          color: 'white',
          backgroundColor: 'red'
        }
      }, this.state.err.toString())
    }

    return React.Children.only(this.props.children)
  }
}

module.exports = Catch

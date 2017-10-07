const React = require('react')
const { renderPortal } = require('react-dom')

class Head extends React.Component {
  constructor () {
    super()

    this.renderHead = () => {
      const children = React.Children.toArray(this.props.children)
      const head = document.querySelector('head')
      renderPortal(
        children,
        head
      )
    }
  }

  componentDidMount () {
    // this.renderHead()
  }

  render () {
    console.log(this.props)
    return false
  }
}

module.exports = Head

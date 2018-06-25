import React from 'react'
import { withRouter } from 'react-router-dom'

export default withRouter(class extends React.Component {
  componentDidUpdate (prev) {
    const { pathname, hash } = this.props.location
    if (prev.location.pathname !== pathname) {
      window.scrollTo(0, 0)
    }

    // check performance of this
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (!el) return
      el.scrollIntoView()
    }
  }

  render () {
    return false
  }
})

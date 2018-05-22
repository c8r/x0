import React from 'react'

export default class extends React.Component {
  static getInitialProps = async () => {
    return {
      routes: [
        { path: '/posts/beep' },
        { path: '/posts/boop' },
      ],
      path: '/posts/:name'
    }
  }

  render () {
    const { name } = this.props.match.params
    return (
      <h1>{name}</h1>
    )
  }
}

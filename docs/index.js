import React from 'react'
import { Link } from 'react-router-dom'

export default class extends React.Component {
  render () {
    return (
      <React.Fragment>
        <h1>x0</h1>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/hello'>Hello JSX</Link>
          </li>
          <li>
            <Link to='/mdx'>MDX</Link>
          </li>
        </ul>
        <video
          style={{
            maxWidth: '100%',
            height: 'auto'
          }}
          autoPlay
          loop
          muted
          playsInline>
          <source src='/demo.mp4' />
        </video>
      </React.Fragment>
    )
  }
}

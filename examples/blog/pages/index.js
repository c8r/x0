import React from 'react'
import { Link } from 'react-router-dom'

const formatDate = date => date
  ? date.toLocaleString()
  : ''

export default props =>
  <div
    style={{
      maxWidth: 1024,
      margin: 'auto',
      padding: 32
    }}>
    <h1>Blog example</h1>
    <ul>
      {props.routes
        .filter(route => route.name !== 'index')
        .sort((a, b) => a.props.date - b.props.date)
        .map(route => (
          <li key={route.key}>
            <Link to={route.href}>
              {route.name} ({formatDate(route.props.date)})
            </Link>
          </li>
        ))}
    </ul>
  </div>

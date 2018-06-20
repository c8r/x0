import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { style, borderColor } from 'styled-system'

const gridWidth = style({
  prop: 'width',
  cssProperty: 'gridTemplateColumns',
  getter: n => `repeat(auto-fit, minmax(${n}, 1fr))`
})

const gridGap = style({
  prop: 'gap',
  cssProperty: 'gridGap',
  numberToPx: true
})

const gridHeight = style({
  prop: 'height',
  cssProperty: 'gridAutoRows',
  numberToPx: true
})

const Grid = styled.div([], {
  display: 'grid'
},
  gridWidth,
  gridGap,
  gridHeight
)

Grid.defaultProps = {
  width: '256px',
  height: 192
}

const Card = styled(Link)([], {
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  overflow: 'hidden',
  border: '1px solid'
}, borderColor)

Card.defaultProps = {
  borderColor: 'gray'
}

export default class extends React.Component {
  static defaultProps = {
    fullWidth: true,
    hidePagination: true
  }

  render () {
    const {
      routes = [],
      route,
      location
    } = this.props

    const examples = routes
      .filter(r => r.dirname === route.dirname)
      .filter(r => r !== route)

    // todo: code-loader
    // .map(route => route)

    return (
      <React.Fragment>
        <Grid>
          {examples.map(({
            key,
            path,
            name,
            Component
          }) => (
            <Card
              key={key}
              to={path}
            >
              <Component />
              <pre>{name}</pre>
            </Card>
          ))}
        </Grid>
      </React.Fragment>
    )
  }
}

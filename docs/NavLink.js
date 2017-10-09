import styled from 'cxs/x'
import { fontSize, space, propTypes } from 'styled-system'

const NavLink = styled('a')({
  textDecoration: 'none',
  display: 'inline-block',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  padding: '8px',
  color: 'inherit'
}, fontSize, space)

NavLink.propTypes = {
  ...propTypes.fontSize,
  ...propTypes.space
}

NavLink.defaultProps = {
  f: '10px'
}

export default NavLink

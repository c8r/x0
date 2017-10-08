import styled from 'cxs/x'
import { space, propTypes } from 'styled-system'

const NavLink = styled('a')({
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '12px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  padding: '8px',
  color: 'inherit'
}, space)

NavLink.propTypes = {
  ...propTypes.space
}

export default NavLink

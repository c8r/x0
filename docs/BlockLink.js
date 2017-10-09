import styled from 'cxs/x'
import { space, propTypes } from 'styled-system'

const BlockLink = styled('a')({
  display: 'block',
  color: 'inherit',
  textDecoration: 'none'
}, space)

BlockLink.propTypes = {
  ...propTypes.space
}

export default BlockLink

import nano from 'nano-style'
import { space, propTypes } from 'styled-system'

const BlockLink = nano('a')({
  display: 'block',
  color: 'inherit',
  textDecoration: 'none'
}, space)

BlockLink.propTypes = {
  ...propTypes.space
}

export default BlockLink

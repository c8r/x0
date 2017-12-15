import nano from 'nano-style'
import {
  space,
  width,
  fontSize,
  color,
  propTypes
} from 'styled-system'

const Box = nano('div')(space, width, fontSize, color)

Box.propTypes = {
  ...propTypes.space,
  ...propTypes.width,
  ...propTypes.fontSize,
  ...propTypes.color
}

Box.displayName = 'Box'

export default Box

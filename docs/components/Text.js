import nano from 'nano-style'
import {
  fontSize,
  fontWeight,
  textAlign,
  space,
  color,
  propTypes
} from 'styled-system'

const Text = nano('div')({},
  fontSize,
  fontWeight,
  textAlign,
  space,
  color
)

Text.propTypes = {
  ...propTypes.fontSize,
  ...propTypes.fontWeight,
  ...propTypes.textAlign,
  ...propTypes.space,
  ...propTypes.color,
}

export default Text

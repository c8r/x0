import styled from 'cxs/x'
import {
  fontSize,
  fontWeight,
  textAlign,
  space,
  color,
  propTypes
} from 'styled-system'

const Text = styled('div')({},
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

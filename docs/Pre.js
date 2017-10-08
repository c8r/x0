import styled from 'cxs/x'
import { fontSize, color, propTypes } from 'styled-system'

const Pre = styled('pre')({
  fontFamily: '"Roboto Mono", Menlo, monospace',
  margin: 0,
  padding: 0,
}, fontSize, color)

Pre.defaultProps = {
  f: 'inherit'
}

Pre.propTypes = {
  ...propTypes.fontSize,
  ...propTypes.color
}

export default Pre

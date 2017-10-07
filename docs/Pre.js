import styled from 'cxs/x'
import { color, propTypes } from 'styled-system'

const Pre = styled('pre')({
  fontFamily: '"Roboto Mono", Menlo, monospace',
  fontSize: 'inherit',
  margin: 0,
}, color)

Pre.propTypes = {
  ...propTypes.color
}

export default Pre

import cxs from 'cxs/component'
import { space } from 'styled-system'

const Title = cxs('h1')({
  fontFamily: '"Roboto Mono", Menlo, monospace',
  fontSize: 32,
  lineHeight: 1.25,
  fontWeight: 400,
  display: 'inline-block',
  color: 'black',
  backgroundColor: 'cyan'
}, space)

Title.defaultProps = {
  px: 2
}

export default Title

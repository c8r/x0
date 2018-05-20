import nano from 'nano-style'
import { space } from 'styled-system'

const MonoTitle = nano('h1')({
  fontFamily: '"Roboto Mono", Menlo, monospace',
  fontSize: '32px',
  fontWeight: 600,
  lineHeight: 1.25,
  fontWeight: 400,
  display: 'inline-block',
  color: 'black',
  backgroundColor: 'cyan',
  borderRadius: '8px'
}, space)

MonoTitle.defaultProps = {
  m: 0,
  px: 2,
}

const Title = nano('h1')({
  fontSize: '64px',
  fontWeight: 600,
  lineHeight: 1.25,
}, space)

Title.defaultProps = {
  m: 0,
}

export default Title

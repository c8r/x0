import nano from 'nano-style'
import { space, propTypes } from 'styled-system'

const Btn = nano('a')({
  display: 'inline-block',
  textDecoration: 'none',
  fontSize: '12px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '.2em',
  paddingTop: '12px',
  paddingBottom: '12px',
  paddingLeft: '24px',
  paddingRight: '24px',
  color: 'black',
  backgroundColor: 'white',
  border: 0,
  borderRadius: '8px'
}, space)

Btn.propTypes = {
  ...propTypes.space
}

export default Btn

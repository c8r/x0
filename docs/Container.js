import nano from 'nano-style'
import Box from './Box'

const Container = nano(Box)({
  maxWidth: '768px'
})

Container.defaultProps = {
  px: [ 2, 3 ],
  mx: 'auto'
}

export default Container

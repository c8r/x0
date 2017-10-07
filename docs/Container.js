import styled from 'cxs/x'
import Box from './Box'

const Container = styled(Box)({
  maxWidth: '1024px'
})

Container.defaultProps = {
  px: 3,
  mx: 'auto'
}

export default Container

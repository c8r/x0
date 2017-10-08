import styled from 'cxs/x'
import Box from './Box'

const Container = styled(Box)({
  maxWidth: '768px'
})

Container.defaultProps = {
  px: [ 2, 3 ],
  mx: 'auto'
}

export default Container

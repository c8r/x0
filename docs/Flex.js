import styled from 'cxs/x'
import {
  alignItems,
  justifyContent,
  flexWrap,
  propTypes
} from 'styled-system'
import Box from './Box'

const Flex = styled(Box)({
  display: 'flex'
}, alignItems, justifyContent, flexWrap)


Flex.propTypes = {
  ...propTypes.alignItems,
  ...propTypes.justifyContent,
  ...propTypes.flexWrap
}

Flex.displayName = 'Flex'

export default Flex

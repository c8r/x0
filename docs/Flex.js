import styled from 'cxs/component'
import {
  alignItems,
  justifyContent,
  wrap,
  propTypes
} from 'styled-system'
import Box from './Box'

const Flex = styled(Box)({
  display: 'flex'
}, alignItems, justifyContent, wrap)

Flex.propTypes = {
  ...propTypes.alignItems,
  ...propTypes.justifyContent,
  ...propTypes.wrap
}

export default Flex

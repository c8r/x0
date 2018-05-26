import React from 'react'
import { Provider } from 'rebass'
import theme from './theme'

export default ({ render }) =>
  <Provider theme={theme}>
    {render()}
  </Provider>

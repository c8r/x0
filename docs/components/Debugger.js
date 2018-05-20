import React from 'react'

const Debugger = props => <pre children={JSON.stringify(props, null, 2)} />

export default Debugger

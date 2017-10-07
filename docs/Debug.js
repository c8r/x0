import React from 'react'

const Debug = props => <pre children={JSON.stringify(props, null, 2)} />

export default Debug

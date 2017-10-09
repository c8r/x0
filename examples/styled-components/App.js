import React from 'react'
import styled, { ServerStyleSheet } from 'styled-components'
import connect from 'refunk'

const css = `*{box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;margin:0}`

const Root = styled('div')([], {
  padding: '48px'
})

const Heading = styled('h1')([], {
  fontSize: '48px',
  margin: 0
})

const Button = styled('button')([], props => ({
  display: 'inline-block',
  fontFamily: 'inherit',
  fontSize: '14px',
  paddingTop: '6px',
  paddingBottom: '6px',
  paddingLeft: '12px',
  paddingRight: '12px',
  border: 0,
  borderRadius: '4px',
  color: 'white',
  backgroundColor: props.color,
  WebkitAppearance: 'none'
}))

Button.defaultProps = {
  color: '#07c'
}

const colors = [
  'tomato',
  'magenta',
  'cyan',
  'yellow'
]

const dec = state => ({ count: state.count - 1 })
const inc = state => ({ count: state.count + 1 })

const App = connect(props => [
  props.styles && (
    <head
      dangerouslySetInnerHTML={{
        __html: props.styles || ''
      }}
    />
  ),
  <Root>
    <div id='app'>
      <title>x0 styled-components {props.count}</title>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Heading>Hello x0 styled-components</Heading>
      <Button
        color={colors[props.count % colors.length]}
        onClick={e => props.update(inc)}>
        Beep {props.count}
      </Button>
    </div>
  </Root>
])

App.defaultProps = {
  styles: false,
  count: 0
}

App.getInitialProps = ({ Component, props }) => {
  const sheet = new ServerStyleSheet()
  sheet.collectStyles(<Component {...props} />)
  const styles = sheet.getStyleTags()
  return { styles }
}

export default App

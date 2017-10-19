const React = require('react')

const { renderToString } = require('react-dom/server')
const { renderStatic } = require('glamor/server')

const e = React.createElement

module.exports = (Component, props) => {
  class WithCss extends React.Component {
    render () {
      return (
        e('div', null,
          e('style', {
            dangerouslySetInnerHTML: {
              __html: this.props.__css
            }
          }),
          e(Component, this.props)
        )
      )
    }
  }

  WithCss.getInitialProps = ({ Component, props }) => {
    const { css } = renderStatic(() => {
      return renderToString(e(Component, props))
    })

    return {
      __css: css
    }
  }

  return WithCss
}

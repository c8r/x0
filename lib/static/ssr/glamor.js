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

  WithCss.getInitialProps = async ({ Component, props }) => {
    let newProps = {}

    if (Component.getInitialProps) {
      newProps = await Component.getInitialProps({ Component, props })
    }

    const { css } = renderStatic(() => {
      return renderToString(e(Component, props))
    })

    return Object.assign({}, props, newProps, {
      __css: css
    })
  }

  return WithCss
}

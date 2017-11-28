const React = require('react')

const { renderToString } = require('react-dom/server')
const { renderStatic } = require('glamor/server')

const e = React.createElement

module.exports = (Component, props) => {
  class WithCss extends React.Component {
    render () {
      const { css } = renderStatic(() => {
        return renderToString(e(Component, props))
      })

      return (
        e('div', null,
          e('style', {
            dangerouslySetInnerHTML: {
              __html: css
            }
          }),
          e(Component, this.props)
        )
      )
    }
  }

  return WithCss
}

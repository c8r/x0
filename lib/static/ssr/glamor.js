const React = require('react')

const { renderToString } = require('react-dom/server')
const { renderStatic } = require('glamor/server')

const e = React.createElement

module.exports = (Component, props) => {
  const el = e('div', null,
    e('style', {
      dangerouslySetInnerHTML: {
        __html: props.__css
      }
    }),
    e(Component, props)
  )

  el.getInitialProps = (Component, props) => {
    const { css } = renderStatic(() => {
      return renderToString(<Component{...props} />)
    })

    return {
      __css: css
    }
  }

  return el
}

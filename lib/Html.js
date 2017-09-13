const React = require('react')
const h = React.createElement

module.exports = ({
  title,
  description,
  image,
  css,
  js,
  stylesheets = [],
  scripts = [],
  initialProps,
  children
}) => h('html', null,
  h('head', null,
    h('title', null, title),
    h('meta', { charSet: 'utf-8' }),
    meta('viewport', 'width=device-width, initial-scale=1'),
    meta('description', description),
    image && meta('og:image', image),
    css && style(css),
    stylesheets.map(href => h('link', { key: href, href, rel: 'stylesheet' })),
  ),
  h('body', null,
    h('div', { id: 'app' },
      children
    ),
    // todo: boolean condition
    h('script', {
      id: '__initial-props__',
      type: 'application/json',
      dangerouslySetInnerHTML: {
        __html: initialProps
      }
    }),
    js && script(js),
    scripts.map(src => h('script', { key: src, src }))
  ),
)

const meta = (name, content) => h('meta', { name, content })

const danger = tag => val => h(tag, {
  dangerouslySetInnerHTML: {
    __html: val
  }
})

const style = danger('style')
const script = danger('script')

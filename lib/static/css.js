const { pkg } = require('read-pkg-up').sync()

// all these libraries might be wildly too different to reasonably account for
const libs = [
  'styled-components',
  'cxs',
  'glamor',
  'glamorous',
  'fela',
]

// todo: check semver
module.exports = () => {
  const { dependencies = {} } = pkg
  let lib
  let version

  libs.forEach(name => {
    if (Object.keys(dependencies).includes(name)) {
      lib = name
      version = dependencies[lib]
    }
  })

  switch (lib) {
    case 'styled-components':
      // wtf this api is convoluted af
      // seems like this needs the components to render inside
      // one of these functions
      const { ServerStyleSheet } = require('styled-components')
      const sheet = new ServerStyleSheet()

      // console.log('sheet instance', sheet.create)
      // const css = sheet.getStyleTags()

      // could return react elements here
      // const css = sheet.getStyleElements()
      break
    // case 'glamorous':
    case 'cxs':
      const cxs = require('cxs')
      const css = cxs.css()
      return css
    default:
      return ''
  }

}

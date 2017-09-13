const { pkg } = require('read-pkg-up').sync()

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

  // all these libraries might be wildly too different to reasonably account for
  switch (lib) {
    case 'styled-components':
      // wtf this api is convoluted af
      const { ServerStyleSheet } = require('styled-components')
      const sheet = new ServerStyleSheet()
      // console.log('sheet instance', sheet.create)
      // const css = sheet.getStyleTags()
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

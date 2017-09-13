#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const { pkg } = require('read-pkg-up').sync()

require('update-notifier')({
  pkg: require('../package.json')
}).notify()

const cli = meow(`
  Usage:

    $ rx0 dev src/Component.js

    $ rx0 static src/Component.js

  Options:

    -d --out-dir  Output directory for static build

`, {
  alias: {
    d: 'outDir'
  }
})

const [ cmd, file, rootpath ] = cli.input
const options = Object.assign({}, pkg.rx0, cli.flags)

const absolute = f => f
  ? path.isAbsolute(f) ? f : path.join(process.cwd(), f)
  : null

const filename = absolute(file)
const dir = fs.statSync(filename).isDirectory()
const root  = absolute(rootpath)

switch (cmd) {
  case 'dev':
    const dev = require('../lib/dev')
    dev(filename, options, (err, port) => {
      console.log(port)
    })
    break
  case 'static':
    const static = require('../lib/static')
    if (dir) {
      console.log('todo: render multiple pages')
    } else {
      static(filename, root, options, (err, html) => {
        if (!options.outDir) {
          console.log(html)
        } else {
          console.log('Static page built')
        }
      })
    }
    break
  default:
    process.exit(0)
}

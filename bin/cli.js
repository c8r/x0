#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const meow = require('meow')

const cli = meow(`
  Usage:

    $ rx0 dev src/Component.js

    $ rx0 static src/Component.js

`, {
})

const [ cmd, file, rootpath ] = cli.input
const options = cli.flags

const absolute = f => f
  ? path.isAbsolute(f) ? f : path.join(process.cwd(), f)
  : null

const filename = absolute(file)
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
    const html = static(filename, root, options)
    console.log(html)
    break
  default:
    process.exit(0)
}

#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const server = require('../lib/server')

const cli = meow(`
  Usage:
    $ rx0 dev Component.j

`, {
})

const [ cmd, file ] = cli.input
const options = cli.flags

const filename = path.isAbsolute(file)
  ? file
  : path.join(process.cwd(), file)

switch (cmd) {
  case 'dev':
    server(filename, options, (err, port) => {
      console.log(port)
    })
    break
  default:
    process.exit(0)
}

#!/usr/bin/env node
const path = require('path')
const meow = require('meow')
const { pkg } = require('read-pkg-up').sync()
const openBrowser = require('react-dev-utils/openBrowser')
const ora = require('ora')
const chalk = require('chalk')

const x0Pkg = require('../package.json')

require('update-notifier')({ pkg: x0Pkg }).notify()

const cli = meow(`
  Usage:

    $ x0 dev src/App.js

    $ x0 build src/App.js

  Options:

    -d --out-dir  Output directory for static build

    -s --static   Render static HTML without client-side JS

    -p --port     Port for dev server

    -o --open     Open dev server in default browser

    -c --config   Pass a custom weback config to merge with the default config

    --proxy       Proxy requests to another server (only for dev)

    --proxy-path  Path to proxy, default: /api

`, {
  alias: {
    d: 'outDir',
    s: 'static',
    p: 'port',
    o: 'open',
    c: 'config',
    h: 'help',
    v: 'version',
  }
})

const [ cmd, file ] = cli.input
const options = Object.assign({}, pkg.x0, cli.flags)

const absolute = f => f
  ? path.isAbsolute(f) ? f : path.join(process.cwd(), f)
  : null

const filename = absolute(file || cmd)

console.log(chalk.black.bgCyan(' x0 '), chalk.cyan('@compositor/x0'), '\n')
const spinner = ora().start()

switch (cmd) {
  case 'build':
    spinner.start('building static site')
    const build = require('../lib/static')
    build(filename, options)
      .then(async html => {
        if (!options.outDir) {
          return console.log(html)
        }

        spinner.succeed(`static site saved to ${options.outDir}`)
      })
      .catch(err => {
        spinner.fail('Error')
        console.log(err)
        process.exit(1)
      })
    break
  case 'dev':
  default:
    spinner.start('starting dev server')
    const dev = require('../lib/dev')
    dev(filename, options)
      .then(server => {
        const { port } = server.listeningApp.address()
        spinner.succeed(`dev server listening at http://localhost:${port}`)
        if (options.open) {
          openBrowser(`http://localhost:${port}`)
        }
      })
      .catch(err => {
        spinner.fail(err)
        process.exit(1)
      })
    break
}

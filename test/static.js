import fs from 'fs'
import path from 'path'
import test from 'ava'
import build from '../lib/build'

const hello = path.join(__dirname, './components/Hello.js')
const withprops = path.join(__dirname, './components/Props.js')
const output = path.join(__dirname, './output')
const htmlFile = path.join(__dirname, './output/index.html')
const bundleFile = path.join(__dirname, './output/bundle.js')

const clean = () => {
  if (fs.existsSync(htmlFile)) {
    fs.unlinkSync(htmlFile)
  }
  if (fs.existsSync(bundleFile)) {
    fs.unlinkSync(bundleFile)
  }
}

test.before(clean)
test.after(clean)

test.cb('static renders', t => {
  build(hello, {})
    .then(result => {
      t.is(typeof result, 'object')
      t.snapshot(result.html)
      t.end()
    })
})

test.cb('static writes', t => {
  build(hello, {
    outDir: 'test/output'
  })
    .then(result => {
      t.is(typeof result, 'object')
      t.snapshot(result.html)
      t.end()
    })
})

test.cb('static uses getInitialProps method', t => {
  build(withprops, {})
    .then(result => {
      t.is(typeof result, 'object')
      t.snapshot(result.html)
      t.end()
    })
})

test.cb('static picks up routes config', t => {
  build(hello, {
    routes: [
      '/'
    ]
  })
    .then(result => {
      t.is(typeof result, 'object')
      t.snapshot(result.html)
      t.end()
    })
})

test.cb('static makes a directory', t => {
  if (fs.existsSync(output)) {
    fs.rmdirSync(output)
  }

  build(hello, {
    outDir: 'test/output'
  })
    .then(result => {
      t.end()
    })
})

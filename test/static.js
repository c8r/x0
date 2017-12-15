import fs from 'fs'
import path from 'path'
import test from 'ava'
import x0Static from '../lib/static'

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
  x0Static(hello, {})
    .then(result => {
      t.is(typeof result, 'object')
      t.snapshot(result.html)
      t.end()
    })
})

test.cb('static writes', t => {
  x0Static(hello, {
    outDir: 'test/output'
  })
    .then(result => {
      t.is(typeof result, 'object')
      t.snapshot(result.html)
      t.end()
    })
})

test.cb('static uses getInitialProps method', t => {
  x0Static(withprops, {})
    .then(result => {
      t.is(typeof result, 'object')
      t.snapshot(result.html)
      t.end()
    })
})

test.cb('static picks up routes config', t => {
  x0Static(hello, {
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

  x0Static(hello, {
    outDir: 'test/output'
  })
    .then(result => {
      t.end()
    })
})

import fs from 'fs-extra'
import path from 'path'
import test from 'ava'
import build from '../lib/build'

const input = path.join(__dirname, 'components')
const output = path.join(__dirname, './output')
const htmlFile = path.join(__dirname, './output/index.html')
const propsFile = path.join(__dirname, './output/props/index.html')
const bundleFile = path.join(__dirname, './output/bundle.js')

const options = {
  input,
  dirname: input,
  outDir: output,
}

const clean = () => {
  fs.remove(output)
}

test.before(clean)
test.after(clean)

test.cb('static renders', t => {
  build(options)
    .then(result => {
      const html = fs.readFileSync(htmlFile, 'utf8')
      t.snapshot(html)
      t.end()
    })
})

/*
test.cb('static writes', t => {
  build(options)
    .then(result => {
      t.is(typeof result, 'object')
      t.snapshot(result.html)
      t.end()
    })
})
*/

test.cb('static uses getInitialProps method', t => {
  build(options)
    .then(result => {
      const html = fs.readFileSync(propsFile, 'utf8')
      t.snapshot(html)
      t.end()
    })
})

test.cb('static makes a directory', t => {
  fs.remove(output)

  build(options)
    .then(result => {
      t.end()
    })
})

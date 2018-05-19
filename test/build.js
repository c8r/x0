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

test('static renders', async t => {
  const res = await build(options)
  const html = fs.readFileSync(htmlFile, 'utf8')
  t.snapshot(html)
})

test('static uses getInitialProps method', async t => {
  const res = await build(options)
  const html = fs.readFileSync(propsFile, 'utf8')
  t.snapshot(html)
})

test('static makes a directory', async t => {
  fs.remove(output)
  const res = await build(options)
  t.pass()
})

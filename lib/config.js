const path = require('path')

const babel = {
  presets: [
    'babel-preset-env',
    'babel-preset-stage-0',
    'babel-preset-react',
  ].map(require.resolve),
  plugins: [
    'babel-plugin-macros',
    'babel-plugin-transform-runtime'
  ].map(require.resolve)
}

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: require.resolve('babel-loader'),
    options: babel
  },
  {
    test: /\.js$/,
    exclude: path.resolve(__dirname, '../node_modules'),
    include: path.resolve(__dirname),
    loader: require.resolve('babel-loader'),
    options: babel
  },
  {
    test: /\.jsx$/,
    loader: require.resolve('@compositor/jsx-loader'),
    options: {}
  },
  {
    test: /\.mdx$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: babel
      },
      {
        loader: require.resolve('@mdx-js/loader')
      }
    ]
  }
]

// common config
module.exports = {
  stats: 'none',
  resolve: {
    modules: [
      __dirname,
      path.join(__dirname, '../node_modules'),
      path.relative(process.cwd(), path.join(__dirname, '../node_modules')),
      'node_modules'
    ]
  },
  module: {
    rules
  },
  node: {
    fs: 'empty'
  },
  plugins: []
}

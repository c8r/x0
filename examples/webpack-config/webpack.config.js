module.exports = {
  module: {
    rules: [
      {
        test: /\.txt/,
        use: [
          'raw-loader'
        ]
      }
    ]
  }
}

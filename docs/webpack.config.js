module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          // 'raw-loader'
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'env',
                'stage-0',
                'react'
              ]
            }
          },
          '@compositor/md-loader'
        ]
      }
    ]
  }
}

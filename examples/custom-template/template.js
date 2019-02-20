module.exports = ({
  html = '',
  css = '',
  scripts,
  meta = [],
  links = [],
}) =>
`<!DOCTYPE html>
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width,initial-scale=1'>
  <title>x0 Custom Template</title>
  ${css}
</head>
<div id=root>${html}</div>
${scripts}
`

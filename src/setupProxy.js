// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://dev.api.overschool.by:8000/',
      changeOrigin: true,
      secure: false,
      ws: true,
    }),
  )
}

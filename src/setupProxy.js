// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://45.135.234.137:8000',
      changeOrigin: true,
      secure: false,
    }),
  )
}

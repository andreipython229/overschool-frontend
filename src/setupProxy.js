// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
module.exports = function (app) {
  app.use(
    '/api/socket.io',
    createProxyMiddleware({
      target: 'http://45.135.234.137:8000',
      //   target: 'http://localhost:8000',
      ws: true,
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api/socket.io': '/api' },
    }),
  )

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://45.135.234.137:8000',
      //   target: 'http://localhost:8000',
      changeOrigin: true,
      secure: false,
    }),
  )
}

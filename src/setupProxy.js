const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api/socket.io',
    createProxyMiddleware({
      target: 'http://sanbox.overschool.by',
      ws: true,
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api/socket.io': '/api' },
    }),
  )
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://sanbox.overschool.by',
      changeOrigin: true,
      secure: false,
    }),
  )
  app.use(
    '/video',
    createProxyMiddleware({
      target: 'http://45.87.219.3:8000',
      changeOrigin: false,
      secure: false,
      onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('origin', 'http://45.87.219.3:8000')
      },
    }),
  )
}

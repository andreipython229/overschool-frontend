const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api/socket.io',
    createProxyMiddleware({
      // target: 'http://sandbox.overschool.by',
      target: 'https://apidev.overschool.by',
      ws: true,
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api/socket.io': '/api' },
    }),
  )
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://apidev.overschool.by',
      // target: 'http://sandbox.overschool.by',
      changeOrigin: true,
      secure: false,
    }),
  )
  app.use(
    '/video',
    createProxyMiddleware({
      target: 'http://45.135.234.137:8000',
      // target: 'http://45.87.219.3:8000',
      changeOrigin: false,
      secure: false,
      onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('origin', 'http://45.135.234.137:8000')
        // proxyReq.setHeader('origin', 'http://45.87.219.3:8000')
      },
    }),
  )
}

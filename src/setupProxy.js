const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api/socket.io',
    createProxyMiddleware({
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
      changeOrigin: true,
      secure: false,
    }),
  )
  app.use(
    '/video',
    createProxyMiddleware({
      target: 'https://apidev.overschool.by',
      changeOrigin: false,
      secure: false,
      
      onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('origin', 'https://apidev.overschool.by')
      },
    }),
  )
}

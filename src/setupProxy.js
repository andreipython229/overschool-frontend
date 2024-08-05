/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api/socket.io',
    createProxyMiddleware({
      // target: 'http://sandbox.coursehb.ru',
      target: 'https://apidev.coursehb.ru',
      ws: true,
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api/socket.io': '/api' },
    }),
  )
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://sandbox.coursehb.ru',
      target: 'https://apidev.coursehb.ru',
      changeOrigin: true,
      secure: false,
    }),
  )
  app.use(
    '/video',
    createProxyMiddleware({
      // target: 'http://45.135.234.21:8000',
      target: 'http://45.135.234.9:8000',
      changeOrigin: false,
      secure: false,
      onProxyReq(proxyReq, req, res) {
        // proxyReq.setHeader('origin', 'http://45.135.234.21:8000')
        proxyReq.setHeader('origin', 'http://45.135.234.9:8000')
      },
    }),
  )
}

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api/socket.io',
    createProxyMiddleware({
      target: process.env.REACT_APP_RUN_MODE === 'PRODUCTION' ? 'http://91.198.166.31:8000' : 'http://sandbox.coursehb.ru',
      ws: true,
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api/socket.io': '/api' },
    }),
  )
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_RUN_MODE === 'PRODUCTION' ? 'http://91.198.166.31:8000' : 'http://sandbox.coursehb.ru',
      changeOrigin: true,
      secure: false,
    }),
  )
  app.use(
    '/video',
    createProxyMiddleware({
      target: process.env.REACT_APP_RUN_MODE === 'PRODUCTION' ? 'http://45.135.234.9:8000' : 'http://45.135.234.21:8000',
      changeOrigin: false,
      secure: false,
      onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('origin', process.env.REACT_APP_RUN_MODE === 'PRODUCTION' ? 'http://91.198.166.31:8000' : 'http://45.135.234.21:8000')
      },
    }),
  )
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
module.exports = function (app) {
  // app.use(
  //   createProxyMiddleware('/api', {
  //     target: 'http://dev.api.overschool.by:8000',
  //     changeOrigin: true,
  //     secure: false,
  //     ws: true,
  //   }),
  // )

  app.use(
    '/api/socket.io', // Обновленный путь прокси
    createProxyMiddleware({
      target: 'http://dev.api.overschool.by:8000/',
      ws: true,
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api/socket.io': '/api' }, // Переписывает путь
    }),
  )

  // You only need this part if your server also has actual express endpoints
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://dev.api.overschool.by:8000',
      changeOrigin: true,
      secure: false,
    }),
  )
}

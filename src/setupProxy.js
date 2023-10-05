const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/api/socket.io',
        createProxyMiddleware({
            // target: 'http://45.135.234.137:8000',
            target: 'https://apidev.overschool.by',
            //   target: 'http://localhost:8000',
            ws: true,
            changeOrigin: true,
            secure: false,
            pathRewrite: {'^/api/socket.io': '/api'},
        }),
    );

    app.use(
        '/video',
        createProxyMiddleware({
            target: 'http://45.135.234.137:8000',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/video': '/api'
            }
        })
    );

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://apidev.overschool.by',
            // target: 'http://45.135.234.137:8000',
            //   target: 'http://localhost:8000',
            changeOrigin: true,
            secure: false,
        }),
    );
}

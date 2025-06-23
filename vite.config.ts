/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import viteImagemin from 'vite-plugin-imagemin'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
      webp: {
        quality: 80,
      },
    }),
    visualizer({
      filename: 'stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components'),
      assets: path.resolve(__dirname, './src/assets'),
      src: path.resolve(__dirname, './src'),
      utils: path.resolve(__dirname, './src/utils'),
      customHooks: path.resolve(__dirname, './src/customHooks'),
      types: path.resolve(__dirname, './src/types'),
      enum: path.resolve(__dirname, './src/enum'),
      selectors: path.resolve(__dirname, './src/selectors'),
      store: path.resolve(__dirname, './src/store'),
      api: path.resolve(__dirname, './src/api'),
      Pages: path.resolve(__dirname, './src/Pages'),
      MobilePages: path.resolve(__dirname, './src/MobilePages'),
      config: path.resolve(__dirname, './src/config'),
      ServicePages: path.resolve(__dirname, './src/ServicePages'),
      constants: path.resolve(__dirname, './src/constants'),
      scss: path.resolve(__dirname, './src/scss'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/scss/mixin.scss" as *; @use "@/scss/variable.scss" as *;`,
        quietDeps: true,
        charset: false,
        api: 'modern',
        silenceDeprecations: ['mixed-decls'],
      },
    },
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/socket.io': {
        target: process.env.VITE_RUN_MODE === 'PRODUCTION' ? 'https://apidev.coursehb.ru' : 'http://sandbox.coursehb.ru',
        ws: true,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api\/socket\.io/, '/api'),
      },
      '/api': {
        target: process.env.VITE_RUN_MODE === 'PRODUCTION' ? 'https://apidev.coursehb.ru' : 'http://sandbox.coursehb.ru',
        changeOrigin: true,
        secure: false,
      },
      '/video': {
        target: process.env.VITE_RUN_MODE === 'PRODUCTION' ? 'http://45.88.76.53:8000' : 'http://91.211.248.84:8000',
        changeOrigin: false,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, _req, _res) => {
            proxyReq.setHeader('origin', process.env.VITE_RUN_MODE === 'PRODUCTION' ? 'http://45.88.76.53:8000' : 'http://91.211.248.84:8000')
          })
        },
      },
    },
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@reduxjs/toolkit',
            'react-redux',
            'date-fns',
            'lodash',
            'react-player',
            'react-beautiful-dnd',
            'react-dropzone',
            'react-icons',
            'react-select',
            'uuid',
            'yup',
          ]
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})

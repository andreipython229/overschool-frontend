import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import path from 'path'

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],

  tools: {
    rspack: config => config,
    postcss: {},
    htmlPlugin: {
      inject: true,
      minify: html => html,
    },
  },

  output: {
    assetPrefix: '/',
    distPath: {
      root: 'dist',
      js: 'static/js',
      css: 'static/css',
      font: 'static/fonts',
      image: 'static/images',
      media: 'static/media',
    },
    polyfill: 'usage',
    sourceMap: process.env.NODE_ENV === 'development',
    cleanDistPath: true,
    filenameHash: process.env.NODE_ENV !== 'development',
  },

  source: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
    include: ['./src'],
    exclude: ['node_modules'],
    define: {
      'process.env.PUBLIC_RUN_MODE': JSON.stringify(process.env.PUBLIC_RUN_MODE),
      'process.env.PUBLIC_API_URL': JSON.stringify(process.env.PUBLIC_API_URL),
    },
  },

  server: {
    port: 3001,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },

  performance: {
    removeConsole: process.env.NODE_ENV !== 'development',
    buildCache: true,
    profile: false,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
  },
})

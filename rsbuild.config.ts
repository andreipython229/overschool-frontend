import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSass(),
  ],
  tools: {
    rspack: {
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                    quietDeps: true,
                    silenceDeprecations: ['mixed-decls'],
                  },
                },
              },
            ],
          },
        ],
      },
    },
  },
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'assets': path.resolve(__dirname, './src/assets'),
      'src': path.resolve(__dirname, './src'),
      'utils': path.resolve(__dirname, './src/utils'),
      'customHooks': path.resolve(__dirname, './src/customHooks'),
      'types': path.resolve(__dirname, './src/types'),
      'enum': path.resolve(__dirname, './src/enum'),
      'selectors': path.resolve(__dirname, './src/selectors'),
      'store': path.resolve(__dirname, './src/store'),
      'api': path.resolve(__dirname, './src/api'),
      'Pages': path.resolve(__dirname, './src/Pages'),
      'MobilePages': path.resolve(__dirname, './src/MobilePages'),
      'config': path.resolve(__dirname, './src/config'),
      'ServicePages': path.resolve(__dirname, './src/ServicePages'),
      'constants': path.resolve(__dirname, './src/constants'),
      'scss': path.resolve(__dirname, './src/scss'),
    },
  },
  html: {
    template: './index.html',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://apidev.coursehb.ru',
        changeOrigin: true,
        secure: false,
      },
      '/video': {
        target: 'http://45.88.76.53:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  output: {
    distPath: {
      root: 'build',
      js: 'assets/js',
      css: 'assets/css',
      media: 'assets',
    },
    sourceMap: isDev,
    minify: isProduction,
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-module',
    },
  },
}) 
import { defineConfig } from '@rspack/cli'
import { rspack } from '@rspack/core'
import ReactRefreshPlugin from '@rspack/plugin-react-refresh'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  target: 'electron-renderer',
  entry: {
    renderer: './src/renderer/src/renderer.ts',
  },
  resolve: {
    extensions: ['...', '.tsx', '.ts', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.(js|ts|tsx|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                  development: !isProduction,
                  refresh: !isProduction,
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: './src/renderer/index.html' }),
    !isProduction && new ReactRefreshPlugin(),
  ].filter(Boolean),
  experiments: {
    css: true,
  },
})

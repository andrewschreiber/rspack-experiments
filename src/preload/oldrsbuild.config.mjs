import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  context: __dirname,
  mode: 'development',
  target: 'electron-preload',
  watchOptions: {
    poll: 0,
    aggregateTimeout: 0
  },

  devtool: false,
  source: {
    entry: {
      preload: './index.ts'
    }
  },
  output: {
    path: '../../build_rspack',
    filename: '[name].js',
    target: 'node'
  }
})

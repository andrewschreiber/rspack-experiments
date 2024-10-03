/**
 * TODO: rsbuild cannot build electron product
 * So keep using @rspack/cli as compiler
 */
import { defineConfig } from '@rspack/cli'

export default defineConfig({
  mode: 'development',
  target: 'electron-preload',
  watchOptions: {
    poll: 0,
    aggregateTimeout: 0
  },

  devtool: false,
  entry: {
    preload: './index.ts'
  },
  output: {
    path: '../../build_rspack',
    filename: '[name].js'
  }
})

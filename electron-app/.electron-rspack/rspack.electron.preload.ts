import { defineConfig } from '@rspack/cli'
import path from 'path'

const cwd = process.cwd()

export default defineConfig({
  target: 'electron-preload',
  optimization: {
    minimize: false,
  },
  entry: {
    electron_preload: './src/preload/index.ts',
  },
  output: {
    path: path.join(cwd, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
})

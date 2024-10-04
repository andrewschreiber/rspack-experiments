import { defineConfig } from '@rspack/cli'
import path from 'path'

export default defineConfig({
  mode: 'production',
  target: 'electron-main',
  resolve: {
    // tsConfigPath: path.resolve(process.cwd(), '../../tsconfig.json'),
    extensions: ['.ts', '.js'],
  },
  entry: {
    loader: path.join(process.cwd(), 'index1.ts'),
  },
  output: {
    path: path.join(process.cwd(), '../../build_rspack'),
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

import { defineConfig } from '@rspack/cli'
import path from 'path'

const cwd = process.cwd()
export default defineConfig({
  mode: 'production',
  target: 'electron-main',
  resolve: {
    tsConfig: path.resolve(cwd, '../../tsconfig.json'),
    extensions: ['.ts', '.js'],
  },
  entry: {
    loader: path.join(cwd, 'index1.ts'),
  },
  output: {
    path: path.join(cwd, '../../build_working'),
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

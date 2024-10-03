// const { RsdoctorRspackPlugin } = require('@rsdoctor/rspack-plugin')

import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  mode: 'production',
  target: 'electron-main',
  resolve: {
    tsConfig: '../../tsconfig.json',
    extensions: ['.ts', '.js']
  },
  source: {
    entry: {
      main: './index.ts'
    }
  },
  output: {
    path: '../../build_rspack',
    filename: '[name].js',
    target: 'node'
  },
  stats: {
    timings: true,
    all: false
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
              syntax: 'typescript'
            }
          }
        },
        type: 'javascript/auto'
      },
      {
        test: /\.png$/,
        type: 'asset'
      }
    ]
  },
  plugins: [
    // Only register the plugin when RSDOCTOR is true, as the plugin will increase the build time.
    // false &&
    // new RsdoctorRspackPlugin({
    // plugin options
    // })
  ]
})

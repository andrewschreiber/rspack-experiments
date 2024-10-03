import { Configuration } from '@rspack/cli'
import path from 'path'
const { RsdoctorRspackPlugin } = require('@rsdoctor/rspack-plugin')

const tsConfigPath = path.resolve(process.cwd(), '../../tsconfig.json')
const configuration: Configuration = {
  mode: 'production',
  target: 'electron-main',
  resolve: {
    tsConfig: tsConfigPath,
    extensions: ['.ts', '.js']
  },
  entry: {
    main: path.join(__dirname, 'index.ts')
  },
  output: {
    path: path.join(process.cwd(), '../../build_rspack'),
    filename: '[name].js'
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

    false &&
      new RsdoctorRspackPlugin({
        // plugin options
      })
  ]
}

export default configuration

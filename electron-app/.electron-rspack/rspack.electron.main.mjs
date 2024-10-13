import { defineConfig } from '@rspack/cli'
import { join } from 'path'

const cwd = process.cwd()
export default defineConfig({
  // if (config.command === 'dev') {
  //   const args = ['dist/electron_main.js']
  //   spawn('./node_modules/electron/dist/Electron.app/Contents/MacOS/Electron', args, {
  //     shell: true,
  //     stdio: 'inherit',
  //   }).on('close', (code: number) => {
  //     process.exit(code)
  //   })
  // }

  target: 'electron-main',
  optimization: {
    minimize: false,
  },
  entry: {
    electron_main: './src/main/index.ts',
    electron_preload: './src/preload/index.ts',
  },
  output: {
    path: join(cwd, 'dist'),
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

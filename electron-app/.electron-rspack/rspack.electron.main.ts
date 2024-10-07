import { defineConfig } from '@rspack/cli'
import path from 'path'
import { spawn } from 'child_process'
import { RspackOptions } from '@rspack/core'

const cwd = process.cwd()
// Configure main and preload processes
export default defineConfig(async (config): Promise<RspackOptions> => {
  if (config.command === 'dev') {
    const args = ['dist/electron_main.js']
    spawn('./node_modules/electron/dist/Electron.app/Contents/MacOS/Electron', args, {
      shell: true,
      stdio: 'inherit',
    }).on('close', (code: number) => {
      process.exit(code)
    })
  }

  return {
    target: 'electron-main',
    optimization: {
      minimize: false,
    },
    entry: {
      electron_main: './src/main/index.ts',
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
  }
})

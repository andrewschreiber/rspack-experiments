console.log('rsbuild.config.ts', new Date().toISOString())
// BAD
// Merge doesn't work because it just overwrites based on order
import { defineConfig, RsbuildConfig, EnvironmentConfig, mergeRsbuildConfig } from '@rsbuild/core'
import path from 'path'

import { ChildProcess, spawn } from 'child_process'

const cwd = process.cwd()

// console.log('Got rsbuild defineConfig at time', env, command, envMode)
// console.log('Got rsbuild defineConfig at time', env, command, envMode, new Date().toISOString())
// if (command === 'dev') {
//   const args = ['dist/electron_main.js']
//   spawn('./node_modules/electron/dist/Electron.app/Contents/MacOS/Electron', args, {
//     shell: true,
//     stdio: 'inherit',
//   }).on('close', (code: number) => {
//     process.exit(code)
//   })
// }
//

const preloadConfig = defineConfig({
  root: __dirname,
  dev: { writeToDisk: true, hmr: false, progressBar: false },
  output: { target: 'node' },

  tools: {
    rspack: {
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
    },
  },
})

const mainConfig = defineConfig({
  root: __dirname,
  dev: { writeToDisk: true, hmr: false, progressBar: false },
  output: { target: 'node' },
  tools: {
    rspack: {
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
    },
  },
})

const rendererConfig = defineConfig({
  // console.log('Got rsbuild defineConfig at time', env, command, envMode, new Date().toISOString())

  html: {
    template: './src/renderer/index.html',
  },
  source: {
    entry: { renderer: './src/renderer/src/renderer.ts' },
    tsconfigPath: './tsconfig.json',
    transformImport: [],
  },
  output: {
    target: 'web',
    assetPrefix: 'auto',
    distPath: {
      root: './dist',
    },
  },
  plugins: [],
  dev: {
    hmr: true,
    progressBar: false,
    writeToDisk: false,
  },

  root: __dirname,
  server: {
    port: 9527,
  },
})

console.log('mainConfig', mainConfig)
console.log('rendererConfig', rendererConfig)

export default mergeRsbuildConfig(preloadConfig, mainConfig, rendererConfig)

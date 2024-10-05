import { defineConfig, RsbuildConfig, EnvironmentConfig } from '@rsbuild/core'
import path from 'path'

import { spawn } from 'child_process'

const cwd = process.cwd()

export default defineConfig(async ({ env, command }): Promise<RsbuildConfig> => {
  if (command === 'dev') {
    const args = ['electron', 'dist/electron_main.js']
    spawn('bunx', args, {
      shell: true,
      stdio: 'inherit',
    }).on('close', (code: number) => {
      process.exit(code)
    })
  }
  console.log('Got args', env, command)
  const preload: EnvironmentConfig = {
    output: {
      target: 'node',
    },
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
  }

  const main: EnvironmentConfig = {
    output: {
      target: 'node',
    },

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
  }

  const renderer: EnvironmentConfig = {
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
      // filename: {
      //   js: '[name].js',
      // },
    },
    plugins: [],
    dev: {
      hmr: true,
      progressBar: false,
    },
  }

  const diskFiles = new Set(['electron_preload.js', 'electron_main.js'])

  return {
    root: __dirname,
    environments: {
      preload,
      main,
      renderer,
    },
    server: {
      port: 9527,
    },
    dev: {
      writeToDisk: (filename) => {
        // Electron needs preload.js and main.js to be written to disk
        // Serve UI as server
        // /Users/andrewschreiber/git/electron-rspack-test/my-app/electron-app/dist/main.js -> main.js
        const lastSlashIndex = filename.lastIndexOf('/')
        const finalFilename = filename.substring(lastSlashIndex + 1)
        return diskFiles.has(finalFilename)
      },
    },
  }
})

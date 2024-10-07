console.log('rsbuild.config.ts', new Date().toISOString())
import { defineConfig, RsbuildConfig, EnvironmentConfig } from '@rsbuild/core'
import path from 'path'

const cwd = process.cwd()

export default defineConfig(async ({ env, command, envMode }): Promise<RsbuildConfig> => {
  console.log('Got rsbuild defineConfig at time', env, command, envMode, new Date().toISOString())

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
    },
    plugins: [],
    dev: {
      hmr: true,
      progressBar: false,
    },
  }

  return {
    root: __dirname,
    environments: {
      preload,
      renderer,
    },
    server: {
      port: 9527,
    },
    dev: {
      writeToDisk: true,
    },
  }
})

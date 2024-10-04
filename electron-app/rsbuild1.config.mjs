import { defineConfig } from '@rsbuild/core'

import { spawn } from 'child_process'

export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  environments: {
    renderer: {
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
        /**
         * Important: If set as an absolute path string,
         * it might be escaped in the browser,
         * causing resource request failures.
         * Therefore, it's best to use "auto".
         */
        assetPrefix: 'auto',
        distPath: {
          root: './dist',
        },
        // filename: {
        //   js: '[name].js',
        // },
      },
      plugins: [],
      performance: {
        // chunkSplit: 'split-by-module',
      },
      dev: {
        hmr: false,
        progressBar: false,
      },
      server: {
        port: 9527,
      },
    },
    main: {
      mode: 'production',
      target: 'electron-main',
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
            main: './src/main/index.ts',
          },
          output: {
            path: './dist',
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
    },
    preload: {
      target: 'electron-preload',
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
            preload: './src/preload/index.ts',
          },
          output: {
            path: './dist',
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
    },
  },
})

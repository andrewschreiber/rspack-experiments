import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  environments: {
    // Configure the web environment for browsers
    main: {
      mode: 'production',
      target: 'electron-main',
      resolve: {
        tsConfig: './tsconfig.json',
        extensions: ['.ts', '.js']
      },
      source: {
        entry: {
          main: './src/main/index.ts'
        }
      },
      output: {
        filename: '[name].js',
        target: 'node'
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
    },
    // Configure the node environment for SSR
    preload: {
      context: __dirname,
      mode: 'development',
      target: 'electron-preload',
      watchOptions: {
        poll: 0,
        aggregateTimeout: 0
      },

      devtool: false,
      source: {
        entry: {
          preload: './src/preload/index.ts'
        }
      },
      output: {
        filename: '[name].js',
        target: 'node'
      }
    },
    renderer: {
      html: {
        template: './src/renderer/index.html'
      },
      source: {
        entry: { renderer: './src/renderer/src/renderer.ts' },
        tsconfigPath: './tsconfig.json',
        transformImport: []
      },
      output: {
        target: 'web',
        /**
         * Important: If set as an absolute path string,
         * it might be escaped in the browser,
         * causing resource request failures.
         * Therefore, it's best to use "auto".
         */
        assetPrefix: 'auto'
        // distPath: {
        //   root: './build_rspack/renderer'
        // }
        // filename: {
        //   js: '[name].js',
        // },
      },
      plugins: [],
      performance: {
        // chunkSplit: 'split-by-module',
      },
      dev: {
        hmr: true,
        progressBar: false
      },
      server: {
        port: 9527
      }
    }
  }
})

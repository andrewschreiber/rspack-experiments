import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  html: {
    template: 'index.html'
  },
  source: {
    entry: { renderer: './src/renderer.ts' },
    tsconfigPath: '../../tsconfig.json',
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
    assetPrefix: 'auto',
    distPath: {
      root: '../../build_rspack/renderer'
    }
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
})

import { defineConfig } from '@rspack/cli'
import path from 'path'
import { spawn } from 'child_process'
import { RspackOptions } from '@rspack/core'

const cwd = process.cwd()

// TODO: Implement electron renderer config
// Unclear if I should continue to use RspackOptions or RsbuildOptions
// I guess the biggest advantage with rspack is that its closer to webpack
// Easier to migrate from webpack to rspack, than webpack to rsbuild ?

export default defineConfig(async (config): Promise<RspackOptions> => {
  return {
    target: 'electron-renderer',
    optimization: {
      minimize: false,
    },
    devServer: {
      port: 9527,
      static: {
        directory: path.join(cwd, 'dist'),
        watch: true,
      },
    },
  }
})

import { defineConfig } from '@rspack/cli'
import path from 'path'
import { spawn } from 'child_process'
import { RspackOptions } from '@rspack/core'

const cwd = process.cwd()

// TODO: Implement electron renderer config
export default defineConfig(async (config): Promise<RspackOptions> => {
  return {
    target: 'electron-renderer',
    optimization: {
      minimize: false,
    },
  }
})

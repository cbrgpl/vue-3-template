/* eslint-env node */
/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import vue from '@vitejs/plugin-vue'

export default defineConfig( {
  build: {
    sourcemap: true,
  },

  server: {
    port: 8080,
  },

  plugins: [
    vue(),
    tsconfigPaths(),
  ],

  test: {
    environment: 'jsdom',
    dir: 'src/__tests__/component',
    setupFiles: [ resolve( 'src', '__tests__', 'utils', 'globalSetup' ) ],
  },

  resolve: {
    alias: {
      '@': resolve( __dirname, 'src' ),
    },
  },
} )

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

const cwd = process.cwd()

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './components/index.js',
      name: 'nfective components',
      fileName: (format) => `nc.${ format }.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
      }
    },
    sourcemap: true,
    emptyOutDir: true,
    outDir: 'dist',
  },
  server: {
    port: '8080'
  },
  resolve: {
    alias: {
      '@': path.join(cwd, './components'),
      '#': path.join(cwd, './src/pages'),
      '$': path.join(cwd, './src/docs')
    }
  },
  plugins: [vue()],
});
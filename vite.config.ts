import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

/**
 * Vite config that sets up the @ alias for src.
 * Uses BASE_URL env var for builds (workflow sets BASE_URL='/').
 */
export default defineConfig(() => {
  const base = process.env.BASE_URL || '/'

  return {
    base,
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        // `@` should map to project `src` directory
        '@': path.resolve(__dirname, 'src'),
      },
      // ensure these extensions are resolved (optional but helpful)
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
  }
})
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

/**
 * Vite config that sets up the @ alias for src.
 * Uses BASE_URL env var for builds (workflow sets BASE_URL='/').
 */
export default defineConfig(({ mode }) => {
  const base = process.env.BASE_URL || '/'

  return {
    base,
    plugins: [
      vue(),
      // Bundle analyzer - generates stats.html after build
      visualizer({
        filename: './dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    resolve: {
      alias: {
        // `@` should map to project `src` directory
        '@': path.resolve(__dirname, 'src'),
      },
      // ensure these extensions are resolved (optional but helpful)
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    build: {
      // Generate source maps for production (hidden source maps for Sentry)
      sourcemap: mode === 'production' ? 'hidden' : true,
      // Optional: increase chunk size warning limit
      chunkSizeWarningLimit: 600,
    },
    define: {
      // Make app version available to Sentry
      '__APP_VERSION__': JSON.stringify(process.env.npm_package_version || '1.0.0'),
    },
  }
})
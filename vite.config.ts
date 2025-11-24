import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteImagemin from 'vite-plugin-imagemin'

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
      viteImagemin({
        // Compress JPG/JPEG images
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        // Compress PNG images
        optipng: {
          optimizationLevel: 7,
        },
        // Compress JPEG images
        mozjpeg: {
          quality: 80,
        },
        // Compress PNG images with better algorithm
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        // Compress SVG images
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
        // Convert images to WebP format
        webp: {
          quality: 80,
        },
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
  }
})
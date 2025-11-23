import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * Vite config that honors a build-time BASE_URL environment variable.
 * The workflow sets BASE_URL='/' so the site is root-relative for your custom domain.
 * Locally, to test a GitHub project page build, set BASE_URL='/WeddingWebsiteVue/'.
 */
export default defineConfig(() => {
  const base = process.env.BASE_URL || '/'
  return {
    base,
    plugins: [vue()],
  }
})
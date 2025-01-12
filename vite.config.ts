import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import ui from './nuxt-ui'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ui()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // temp (jan/2025): try to remove this in the future when tailwindv4 and nuxtui is released officially
  optimizeDeps: {
    exclude: ['@tailwindcss/oxide', 'globby', 'lightningcss'],
  },
})

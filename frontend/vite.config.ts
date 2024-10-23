import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173 // Change to your preferred port
  },
  css: {
    postcss: './postcss.config.js',
  },
})

// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
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
  test: {
    globals: true,      // Enable Vitest global test APIs like describe, it, expect
    environment: 'jsdom', // Use jsdom for DOM simulation for React components
    setupFiles: './src/setupTests.ts',  // Optional: setup file for global configurations (e.g., jest-dom)
  },
})

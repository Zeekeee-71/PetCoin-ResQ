import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["localhost", "resq.petcoinai.info"]
  },
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['buffer', 'crypto-browserify', 'stream-browserify'],
  }
})

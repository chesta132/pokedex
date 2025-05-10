import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: 'http://localhost:5000',
    host: true,
    port: 5000,
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
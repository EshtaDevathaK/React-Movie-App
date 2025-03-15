import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 3000, // Ensure Render uses its assigned PORT
    strictPort: true // Enforce the exact port
  },
  preview: {
    allowedHosts: ["react-movie-app-ckuv.onrender.com"]
  }
})

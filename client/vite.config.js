import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true, // Automatically open the app in the browser
    proxy: {
      '/api': 'http://localhost:5000', // Proxy API requests to the backend server
    },
  },
  // define: {
  //   'process.env': {}, // Fix for some libraries expecting Node env
  // }
})

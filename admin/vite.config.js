import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // सर्वर को सभी IP पर सुनो
    hmr: {
      host: '192.168.137.1', // <<-- YAHAN APNE LAPTOP KA SAHI IP DAALEIN
      protocol: 'ws',
    }
  }
})

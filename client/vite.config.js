import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/register': 'http://localhost:8080',
      '/payment': 'http://localhost:8080',
      '/contactus': 'http://localhost:8080',
      '/showRegistrationSEMA4': 'http://localhost:8080',
      '/showPaymentsSEMA4': 'http://localhost:8080',
      '/showMessagesSEMA4': 'http://localhost:8080',
      '/uploads': 'http://localhost:8080',
    },
  },
  build: {
    outDir: '../public',
    emptyOutDir: true,
  },
});

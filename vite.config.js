import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Increased warning limit for large chunks
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // Code-split vendor modules into individual chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        },
      },
    },
  },
});

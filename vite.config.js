import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Base path for production deployment (change if deploying to subfolder)
  base: './',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 5173,          // Dev server port
    open: true,          // Opens browser automatically
    strictPort: true,    // Fail if port is already in use
    historyApiFallback: true,
  },

  build: {
    outDir: 'dist',      // Output directory for production build
    sourcemap: false,    // Disable source maps in production
    chunkSizeWarningLimit: 1500, // Increase chunk size warning threshold
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },

  define: {
    'process.env': process.env, // Support environment variables
  },
});

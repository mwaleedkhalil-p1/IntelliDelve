import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  server: {
    port: 3004,
    open: true,
    proxy: {
      '/api': {
        target: 'https://informed-bluebird-right.ngrok-free.app',
        changeOrigin: true,
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true',
          Accept: 'application/json'
        }
      },
      '/calendly-proxy': {
        target: 'https://assets.calendly.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/calendly-proxy/, '')
      }
    },
  },
  build: {
    outDir: 'dist/spa',
    sourcemap: mode !== 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          recaptcha: ['react-google-recaptcha', 'react-google-recaptcha-v3'],
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    'import.meta.env.NODE_ENV': JSON.stringify(mode),
    'process.env.REACT_APP_RECAPTCHA_SITE_KEY': JSON.stringify(process.env.REACT_APP_RECAPTCHA_SITE_KEY),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
}));

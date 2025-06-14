import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: false, // true to open the report in the browser
    }),
  ],
  resolve: {
    alias: {
      '@clients': path.resolve(__dirname, './src/models/clients.ts'),
    },
  },
  server: {
    // https: {
    //   key: '/Users/jjgon/Documents/https_certs/key.pem', //uncomment to use http2 and https
    //   cert: '/Users/jjgon/Documents/https_certs/cert.pem',
    // },
    port: 3000,
    open: '/',
  },
});
// bundle size optimization see:
// https://sambitsahoo.com/blog/vite-code-splitting-that-works.html
// https://dev.to/tassiofront/splitting-vendor-chunk-with-vite-and-loading-them-async-15o3

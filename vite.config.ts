import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), visualizer() as PluginOption],
  base: './',
  server: {
    host: true,
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('@mui')) {
              return 'vendor_mui';
            } else if (id.includes('react-router')) {
              return 'vendor_react-router';
            } else if (id.includes('react-router-dom') || id.includes('@remix-run') || id.includes('react-router')) {
              return 'vendor_react_router';
            } else if (id.includes('react-redux')) {
              return 'vendor_react-redux';
            } else if (id.includes('tanstack')) {
              return 'tanstack';
            } else if (id.includes('visx')) {
              return 'vendor_visx';
            } else if (id.includes('faker-js')) {
              return 'vendor_faker-js';
            } else if (id.includes('miragejs')) {
              return 'vendor_miragejs';
            } else if (id.includes('react-dom')) {
              return 'vendor_react-dom';
            }

            return 'vendor'; // all other package goes here
          }
        },
      },
    },
  },
})
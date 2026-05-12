import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@demo-renderer': resolve(__dirname, '../../src'),
      vue: resolve(__dirname, 'node_modules/vue'),
      vant: resolve(__dirname, 'node_modules/vant'),
    },
    dedupe: ['vue', 'vant'],
  },
});

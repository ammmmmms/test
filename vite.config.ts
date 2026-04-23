import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'A2UiVantRenderer',
      fileName: 'a2ui-vant-renderer',
    },
    rollupOptions: {
      external: ['vue', 'vant', '@a2ui/web_core'],
      output: {
        globals: {
          vue: 'Vue',
          vant: 'Vant',
          '@a2ui/web_core': 'A2UIWebCore',
        },
      },
    },
  },
});

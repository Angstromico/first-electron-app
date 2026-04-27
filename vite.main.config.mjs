import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['cjs'],
      fileName: () => 'main.cjs',
    },
    rollupOptions: {
      external: ['electron', 'node:path', 'electron-squirrel-startup', 'better-sqlite3'],
    },
  },
});

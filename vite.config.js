import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    port: 5173,
    open: true,
    watch: {
      // 避免部分环境下 fsevents 异常导致 dev 崩溃
      usePolling: true,
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React и react-dom — отдельный стабильный чанк (хорошо кешируется)
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
            return 'vendor-react';
          }
          // Остальные node_modules — общий vendor
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // foods.js — большой файл с данными о продуктах
          if (id.includes('/src/data/foods.js')) {
            return 'data-foods';
          }
          // ВНИМАНИЕ: локали НЕ группируем — пусть Vite автоматически разбивает
          // каждый JSON на отдельный чанк, тогда грузится только нужный язык
        }
      }
    }
  }
});

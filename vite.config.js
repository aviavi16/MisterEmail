import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue';
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/MisterEmail",
  plugins: [
    react(),
    vue(),
    removeConsole()
  ],
})



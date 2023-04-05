import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
//import requireTransform from 'vite-plugin-require-transform';
// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['net']
  },
  plugins: [

    vue(),
    AutoImport({
      imports: ['vue', 'vue-router']
    }),

  ],

  server: {
    proxy: {
      '/api': 'http://testapi.xuexiluxian.cn'
    }
  }

})

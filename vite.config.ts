import { defineConfig } from 'vite'
import { geaPlugin } from '@geajs/vite-plugin'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [geaPlugin(), tailwindcss()],
  build: {
    modulePreload: { polyfill: false },
  },
})

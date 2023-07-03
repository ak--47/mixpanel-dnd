import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
const local = 'http://localhost:3000'
const localOptions = {
	target: local,
	changeOrigin: true,
	secure: false,
	ws: true,
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
	proxy: {
		'/ping': localOptions,
		'/verify': localOptions
	}	
  }
})

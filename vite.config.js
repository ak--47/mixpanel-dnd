import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
	proxy: {
		'/ping': {
			target: 'http://localhost:3000',
			changeOrigin: true,
			secure: false,      
			ws: true,
		}
	}	
  }
})

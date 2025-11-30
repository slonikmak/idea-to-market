import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Make the base configurable via env to support GitHub Pages deployment.
// During CI we set VITE_BASE (e.g. '/idea-to-market/') so Vite will emit asset
// URLs with the expected prefix. Default falls back to '/' for local dev.
const base = process.env.VITE_BASE ?? '/idea-to-market/'

export default defineConfig({
  base,
  plugins: [react()],
})

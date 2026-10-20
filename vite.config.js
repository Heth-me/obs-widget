import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Fixed by the operator; the widget cannot select an arbitrary API origin.
const proxy = { '/api': { target: process.env.OBS_API_TARGET || 'https://app.heth.me', changeOrigin: true } };
export default defineConfig({ base: '/widget/', plugins: [react()], server: { port: 5174, proxy }, preview: { proxy } });

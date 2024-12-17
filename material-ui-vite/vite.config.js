import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 允許從外部 IP 訪問
    port: 5173, // 自定義端口（默認為 5173，這裡可自行設置）
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Certifique-se de que o diretório de build é 'dist'
    emptyOutDir: true, // Limpa o diretório de build antes de gerar novos arquivos
  },
});
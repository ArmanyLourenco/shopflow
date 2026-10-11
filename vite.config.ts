import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Para publicar no GitHub Pages em https://USUARIO.github.io/shopflow/, mantenha /shopflow/.
// Se mudar o nome do repositório, atualize esta propriedade.
export default defineConfig({
  plugins: [react()],
  base: '/shopflow/',
});
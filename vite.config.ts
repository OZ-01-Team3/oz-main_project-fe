import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/
interface VitePluginSvgrOptions {
  exportAsDefault?: boolean;
  svgrOptions?: {
    icon?: boolean;
  };
}
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        icon: true,
      },
    } as VitePluginSvgrOptions),
  ],

  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      // { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
    ],
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});

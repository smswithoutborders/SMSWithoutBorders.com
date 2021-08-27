import { defineConfig, loadEnv } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh';
import macrosPlugin from 'vite-plugin-babel-macros';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [reactRefresh(), macrosPlugin()],
    define: {
      'process.env': {},
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
        'styles': path.resolve(__dirname, 'src/styles'),
        'pages': path.resolve(__dirname, 'src/pages'),
        'components': path.resolve(__dirname, 'src/components'),
        'services': path.resolve(__dirname, 'src/services'),
        'images': path.resolve(__dirname, 'src/images'),
      },
    },
    server: {
      port: process.env.VITE_PORT,
      host: true,
      open: true
    }
  })
}
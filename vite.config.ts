import react from '@vitejs/plugin-react'

export default {
  server: {
    proxy: {
      '/calculadora-prestamista': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        plugins: [react()],
      },
    },
  },
};




/** @type {import('next').NextConfig} */
const nextConfig = {
    webpackDevMiddleware: (config) => {
      config.watchOptions = {
        poll: 1000, // Verifica cambios cada segundo
        aggregateTimeout: 300, // Tiempo de espera antes de recompilar
      };
      return config;
    },
  };
  
  export default nextConfig;
  
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['rgbcustompc.com', 'rossellimac.es', "media.game.es", "amazon.es", "m.media-amazon.com"],
    },
    webpackDevMiddleware: (config) => {
      config.watchOptions = {
        poll: 1000, 
        aggregateTimeout: 300, 
      };
      return config;
    },
  };
  
  export default nextConfig;
  
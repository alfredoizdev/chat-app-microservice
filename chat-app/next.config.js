/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  
  experimental: { 
    optimizeCss: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: { unoptimized: true },
  basePath: '',
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/landing-ai-agent' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/landing-ai-agent/' : '',
  trailingSlash: true,
}

module.exports = nextConfig 
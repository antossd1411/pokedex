/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    POKEAPI_URL: "https://pokeapi.co/api/v2",
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pokemon',
        permanent: true
      },
    ]
  },
  images: {
    loader: "custom",
    loaderFile: "src/utils/image/loader.js"
  }
}

module.exports = nextConfig

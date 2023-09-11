/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    POKEAPI_URL: "https://pokeapi.co/api/v2/pokemon",
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
}

module.exports = nextConfig

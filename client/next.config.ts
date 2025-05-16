import { NextConfig } from 'next'

const config: NextConfig = {
  serverExternalPackages: ["twitter-api-v2"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amaranth-charming-marlin-562.mypinata.cloud',
        port: '',
        pathname: '/ipfs/**',
        search: '',
      },
    ],
  },
}

export default config

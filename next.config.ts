import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/:lang/namliya',
        destination: '/:lang/namliya/service-offers',
        permanent: false,
      },
      {
        source: '/:lang/genny',
        destination: '/:lang/genny/browse',
        permanent: false,
      },
      {
        source: '/:lang/alaesh-andak',
        destination: '/:lang/alaesh-andak/browse',
        permanent: false,
      },
      {
        source: '/:lang/shbeik-lbeik',
        destination: '/:lang/shbeik-lbeik/browse',
        permanent: false,
      },
    ]
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)

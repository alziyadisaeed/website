import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { LEGACY_HOST_PATTERN, SITE_URL } from './lib/site';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Retired domain -> canonical domain, 308, path + query preserved, single hop
  // (www.old also goes straight to new). Never the reverse.
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: LEGACY_HOST_PATTERN }],
        destination: `${SITE_URL}/ar`,
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: LEGACY_HOST_PATTERN }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

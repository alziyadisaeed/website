import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://drsaeedalziyadi.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: '/admin',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: '/admin',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: '/admin',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: '/admin',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: '/admin',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

import type { MetadataRoute } from 'next';
import { getArticlesRaw } from '@/lib/articles';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://Alziyadi Med.com";
const locales = ['ar', 'en', 'ru'] as const;

const staticPages = [
  '',
  '/services',
  '/specialties',
  '/faq',
  '/blog',
  '/contact',
  '/privacy-policy',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: (page === '/blog' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: page === '' ? 1.0 : 0.8,
    }))
  );

  let articleUrls: MetadataRoute.Sitemap = [];

  try {
    const articles = await getArticlesRaw();

    // Every locale URL resolves for every article (missing translations fall
    // back to Arabic on the page itself), so all three are listed.
    articleUrls = articles.flatMap((a) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/blog/${a.slug}`,
        lastModified: new Date(a.updatedAt ?? a.createdAt ?? Date.now()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    );
  } catch {
    articleUrls = [];
  }

  return [...staticUrls, ...articleUrls];
}

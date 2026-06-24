import type { MetadataRoute } from 'next';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://alziyadimed.com';
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
    await connectDB();
    const articles = await Article.find({})
      .select('slug locale updatedAt')
      .lean() as Array<{ slug: string; locale: string; updatedAt: Date }>;

    const slugMap: Record<string, Record<string, Date>> = {};
    for (const a of articles) {
      if (!slugMap[a.slug]) slugMap[a.slug] = {};
      slugMap[a.slug][a.locale] = a.updatedAt;
    }

    articleUrls = articles.map((a) => ({
      url: `${baseUrl}/${a.locale}/blog/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch {
    articleUrls = [];
  }

  return [...staticUrls, ...articleUrls];
}

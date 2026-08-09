import type { MetadataRoute } from 'next';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';

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
    await connectDB();
    const articles = await Article.find({})
      .select('slug updatedAt')
      .lean() as Array<{ slug: string; updatedAt: Date }>;

    // Every locale URL resolves for every article (missing translations fall
    // back to Arabic on the page itself), so all three are listed.
    articleUrls = articles.flatMap((a) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/blog/${a.slug}`,
        lastModified: a.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    );
  } catch {
    articleUrls = [];
  }

  return [...staticUrls, ...articleUrls];
}

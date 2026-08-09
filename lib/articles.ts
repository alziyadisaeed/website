import { unstable_cache } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export interface RawArticleTranslation {
  title: string;
  excerpt: string;
  content: string;
  wordCount?: number;
}

export interface RawArticle {
  _id: string;
  slug: string;
  translations: {
    ar?: RawArticleTranslation;
    en?: RawArticleTranslation;
    ru?: RawArticleTranslation;
  };
  coverImage?: { url?: string };
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  author: string;
}

export const getArticlesRaw = unstable_cache(
  async (): Promise<RawArticle[]> => {
    const res = await fetch(`${API_URL}/api/articles`, {
      headers: { 'x-api-key': process.env.SERVICE_API_KEY ?? '' },
    });
    if (!res.ok) throw new Error(`Failed to fetch articles: ${res.status}`);
    return res.json();
  },
  ['articles-raw'],
  { tags: ['articles'], revalidate: 86400 }
);

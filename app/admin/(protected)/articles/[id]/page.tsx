import { notFound } from 'next/navigation';
import { updateArticle } from '../../../_actions/articles';
import ArticleForm from '@/components/admin/ArticleForm';
import type { RawArticle } from '@/lib/articles';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

interface ArticleData {
  _id: string;
  slug: string;
  translations: {
    ar?: { title: string; excerpt: string; content: string };
    en?: { title: string; excerpt: string; content: string };
    ru?: { title: string; excerpt: string; content: string };
  };
  coverImage?: { url?: string };
}

async function getArticle(id: string): Promise<ArticleData | null> {
  const res = await fetch(`${API_URL}/api/articles/${id}`, {
    headers: { 'x-api-key': process.env.SERVICE_API_KEY ?? '' },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const doc: RawArticle = await res.json();
  return {
    _id: doc._id,
    slug: doc.slug,
    translations: {
      ar: doc.translations?.ar,
      en: doc.translations?.en,
      ru: doc.translations?.ru,
    },
    coverImage: doc.coverImage,
  };
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  const boundUpdate = updateArticle.bind(null, id);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Article</h1>
        <p className="text-gray-500 text-sm mt-1 truncate max-w-md">{article.translations.ar?.title}</p>
      </div>
      <ArticleForm
        action={boundUpdate}
        defaultValues={{
          slug: article.slug,
          translations: article.translations,
          coverImage: article.coverImage,
        }}
      />
    </div>
  );
}

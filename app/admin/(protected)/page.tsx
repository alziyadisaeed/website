import Link from 'next/link';
import { PlusCircle, Pencil } from 'lucide-react';
import DeleteArticleButton from '@/components/admin/DeleteArticleButton';
import type { RawArticle } from '@/lib/articles';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

interface ArticleRow {
  _id: string;
  title: string;
  slug: string;
  publishedAt: Date | string;
  locales: ('ar' | 'en' | 'ru')[];
}

async function getArticles(): Promise<ArticleRow[]> {
  const res = await fetch(`${API_URL}/api/articles`, {
    headers: { 'x-api-key': process.env.SERVICE_API_KEY ?? '' },
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const docs: RawArticle[] = await res.json();
  return docs
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? b.createdAt ?? 0).getTime() -
        new Date(a.publishedAt ?? a.createdAt ?? 0).getTime()
    )
    .map((d) => ({
      _id: d._id,
      title: d.translations?.ar?.title ?? '(untitled)',
      slug: d.slug,
      publishedAt: d.publishedAt ?? d.createdAt ?? new Date().toISOString(),
      locales: (['ar', 'en', 'ru'] as const).filter((l) => !!d.translations?.[l]),
    }));
}

const localeBadgeColors: Record<string, string> = {
  ar: 'bg-blue-100 text-blue-800',
  en: 'bg-green-100 text-green-800',
  ru: 'bg-purple-100 text-purple-800',
};

export default async function AdminDashboard() {
  let articles: ArticleRow[] = [];
  try {
    articles = await getArticles();
  } catch {
    articles = [];
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
          <p className="text-gray-500 text-sm mt-1">{articles.length} total</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 bg-[#1A6DB5] text-white px-4 py-2 rounded-lg hover:bg-[#3B8FD4] transition-colors text-sm font-medium"
        >
          <PlusCircle size={16} />
          New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 mb-4">No articles yet.</p>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 bg-[#1A6DB5] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3B8FD4] transition-colors"
          >
            <PlusCircle size={16} />
            Create your first article
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Title</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Locale</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Published</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map((article) => (
                <tr key={article._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 max-w-sm truncate">{article.title}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{article.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      {(['ar', 'en', 'ru'] as const).map((l) => (
                        <span
                          key={l}
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            article.locales.includes(l)
                              ? localeBadgeColors[l]
                              : 'bg-gray-50 text-gray-300'
                          }`}
                        >
                          {l.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/articles/${article._id}`}
                        className="inline-flex items-center gap-1 text-gray-500 hover:text-[#1A6DB5] transition-colors px-2 py-1 rounded hover:bg-blue-50"
                      >
                        <Pencil size={14} />
                        Edit
                      </Link>
                      <DeleteArticleButton id={article._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

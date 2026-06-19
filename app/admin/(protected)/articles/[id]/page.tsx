import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import { updateArticle } from '../../../_actions/articles';
import ArticleForm from '@/components/admin/ArticleForm';

interface ArticleData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  locale: string;
}

async function getArticle(id: string): Promise<ArticleData | null> {
  await connectDB();
  const doc = await Article.findById(id).lean();
  if (!doc) return null;
  return {
    _id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    locale: doc.locale,
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
        <p className="text-gray-500 text-sm mt-1 truncate max-w-md">{article.title}</p>
      </div>
      <ArticleForm action={boundUpdate} defaultValues={article} />
    </div>
  );
}

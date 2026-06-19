import { createArticle } from '../../../_actions/articles';
import ArticleForm from '@/components/admin/ArticleForm';

export default function NewArticlePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">New Article</h1>
        <p className="text-gray-500 text-sm mt-1">Create a new blog article</p>
      </div>
      <ArticleForm action={createArticle} />
    </div>
  );
}

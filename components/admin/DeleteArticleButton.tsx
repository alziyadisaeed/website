'use client';

import { Trash2 } from 'lucide-react';
import { deleteArticle } from '@/app/admin/_actions/articles';

export default function DeleteArticleButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm('Delete this article? This cannot be undone.')) return;
    const fd = new FormData();
    await deleteArticle(id);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="inline-flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors px-2 py-1 rounded hover:bg-red-50 text-sm"
    >
      <Trash2 size={14} />
      Delete
    </button>
  );
}

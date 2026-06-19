'use client';

import { useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const TiptapEditor = dynamic(() => import('./TiptapEditor'), { ssr: false });

interface ArticleFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    locale?: string;
  };
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100);
}

export default function ArticleForm({ action, defaultValues }: ArticleFormProps) {
  const [title, setTitle] = useState(defaultValues?.title ?? '');
  const [slug, setSlug] = useState(defaultValues?.slug ?? '');
  const [excerpt, setExcerpt] = useState(defaultValues?.excerpt ?? '');
  const [content, setContent] = useState(defaultValues?.content ?? '');
  const [locale, setLocale] = useState(defaultValues?.locale ?? 'ar');
  const [isPending, startTransition] = useTransition();

  function handleTitleBlur() {
    if (!slug && title) {
      setSlug(toSlug(title));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData();
    fd.set('title', title);
    fd.set('slug', slug);
    fd.set('excerpt', excerpt);
    fd.set('content', content);
    fd.set('locale', locale);
    startTransition(() => action(fd));
  }

  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';
  const inputClass =
    'w-full border border-[#D6E4F0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6DB5]/30 focus:border-[#1A6DB5]';

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            className={inputClass}
            placeholder="Article title"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="slug">Slug</label>
          <input
            id="slug"
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className={inputClass}
            placeholder="article-slug"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="locale">Locale</label>
          <select
            id="locale"
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className={inputClass}
          >
            <option value="ar">🇸🇦 Arabic (ar)</option>
            <option value="en">🇬🇧 English (en)</option>
            <option value="ru">🇷🇺 Russian (ru)</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            required
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className={inputClass}
            placeholder="Short description for SEO and listing pages"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Content</label>
        <TiptapEditor value={content} onChange={setContent} />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#1A6DB5] hover:bg-[#3B8FD4] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60 text-sm"
        >
          {isPending ? 'Saving…' : 'Save Article'}
        </button>
        <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  );
}

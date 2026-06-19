'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { updateTag } from 'next/cache';
import { sanitizeHtml } from '@/lib/sanitize';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import { redirect } from 'next/navigation';

function requireSession() {
  return getServerSession(authOptions).then((session) => {
    if (!session) throw new Error('Unauthorized');
    return session;
  });
}

function countWords(html: string): number {
  return html
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100);
}

export async function createArticle(formData: FormData) {
  await requireSession();
  await connectDB();

  const rawContent = (formData.get('content') as string) ?? '';
  const sanitized = sanitizeHtml(rawContent);
  const title = (formData.get('title') as string) ?? '';
  const slugInput = (formData.get('slug') as string) ?? '';

  await Article.create({
    title,
    slug: slugInput || toSlug(title),
    excerpt: (formData.get('excerpt') as string) ?? '',
    content: sanitized,
    locale: ((formData.get('locale') as string) ?? 'ar') as 'ar' | 'en' | 'ru',
    wordCount: countWords(sanitized),
    publishedAt: new Date(),
    updatedAt: new Date(),
  });

  updateTag('articles');
  redirect('/admin');
}

export async function updateArticle(id: string, formData: FormData) {
  await requireSession();
  await connectDB();

  const rawContent = (formData.get('content') as string) ?? '';
  const sanitized = sanitizeHtml(rawContent);

  await Article.findByIdAndUpdate(id, {
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    content: sanitized,
    locale: (formData.get('locale') as 'ar' | 'en' | 'ru') ?? 'ar',
    wordCount: countWords(sanitized),
    updatedAt: new Date(),
  });

  updateTag('articles');
  redirect('/admin');
}

export async function deleteArticle(id: string) {
  await requireSession();
  await connectDB();
  await Article.findByIdAndDelete(id);
  updateTag('articles');
  redirect('/admin');
}

'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

function requireSession() {
  return getServerSession(authOptions).then((session) => {
    if (!session) throw new Error('Unauthorized');
    return session;
  });
}

async function callApi(path: string, init: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      'x-api-key': process.env.SERVICE_API_KEY ?? '',
      'content-type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Article API request failed: ${res.status}`);
  }

  return res.json();
}

export async function createArticle(formData: FormData) {
  await requireSession();

  await callApi('/api/articles', {
    method: 'POST',
    body: JSON.stringify({
      title: formData.get('title'),
      slug: formData.get('slug'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      locale: formData.get('locale'),
    }),
  });

  updateTag('articles');
  redirect('/admin');
}

export async function updateArticle(id: string, formData: FormData) {
  await requireSession();

  await callApi(`/api/articles/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: formData.get('title'),
      slug: formData.get('slug'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      locale: formData.get('locale'),
    }),
  });

  updateTag('articles');
  redirect('/admin');
}

export async function deleteArticle(id: string) {
  await requireSession();

  await callApi(`/api/articles/${id}`, { method: 'DELETE' });

  updateTag('articles');
  redirect('/admin');
}

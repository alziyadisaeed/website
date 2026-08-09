'use server';

import { getSession } from '@/lib/auth';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  return session;
}

async function callApi(path: string, method: string, formData: FormData) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    body: formData,
    headers: {
      'x-api-key': process.env.SERVICE_API_KEY ?? '',
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Article API request failed: ${res.status}`);
  }

  return res.json();
}

export async function createArticle(formData: FormData) {
  await requireSession();

  await callApi('/api/articles', 'POST', formData);

  updateTag('articles');
  redirect('/admin');
}

export async function updateArticle(id: string, formData: FormData) {
  await requireSession();

  await callApi(`/api/articles/${id}`, 'PUT', formData);

  updateTag('articles');
  redirect('/admin');
}

export async function deleteArticle(id: string) {
  await requireSession();

  const res = await fetch(`${API_URL}/api/articles/${id}`, {
    method: 'DELETE',
    headers: { 'x-api-key': process.env.SERVICE_API_KEY ?? '' },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete article: ${res.status}`);
  }

  updateTag('articles');
  redirect('/admin');
}

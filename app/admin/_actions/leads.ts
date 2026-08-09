'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

async function getCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join('; ');
}

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
}

export async function updateLeadStatus(id: string, status: string) {
  await requireSession();
  const cookieHeader = await getCookieHeader();

  const res = await fetch(`${API_URL}/api/leads/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', cookie: cookieHeader },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error('Failed to update status');
  revalidatePath('/admin/leads');
}

export async function deleteLead(id: string) {
  await requireSession();
  const cookieHeader = await getCookieHeader();

  const res = await fetch(`${API_URL}/api/leads/${id}`, {
    method: 'DELETE',
    headers: { cookie: cookieHeader },
  });

  if (!res.ok) throw new Error('Failed to delete lead');
  revalidatePath('/admin/leads');
}

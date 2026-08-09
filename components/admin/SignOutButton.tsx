'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    router.push('/admin/login');
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors text-sm w-full"
    >
      <LogOut size={16} />
      Sign Out
    </button>
  );
}

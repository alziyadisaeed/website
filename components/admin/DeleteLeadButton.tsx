'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteLead } from '@/app/admin/_actions/leads';

export default function DeleteLeadButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm('Delete this application?')) return;
    startTransition(() => {
      deleteLead(id);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="inline-flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50 disabled:opacity-40"
    >
      <Trash2 size={14} />
    </button>
  );
}

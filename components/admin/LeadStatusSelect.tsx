'use client';

import { useTransition } from 'react';
import { updateLeadStatus } from '@/app/admin/_actions/leads';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-green-100 text-green-800',
};

interface Props {
  id: string;
  current: string;
}

export default function LeadStatusSelect({ id, current }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const status = e.target.value;
    startTransition(() => {
      updateLeadStatus(id, status);
    });
  }

  return (
    <select
      defaultValue={current}
      onChange={handleChange}
      disabled={isPending}
      className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1A6DB5] disabled:opacity-50 ${STATUS_COLORS[current] ?? 'bg-gray-100 text-gray-700'}`}
    >
      <option value="new">New</option>
      <option value="contacted">Contacted</option>
      <option value="closed">Closed</option>
    </select>
  );
}

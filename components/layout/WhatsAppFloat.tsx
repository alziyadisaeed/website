'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const NUMBERS = [
  { flag: '🇷🇺', label: '+7 925 250 0066', href: 'https://wa.me/79252500066' },
  { flag: '🇺', label: '+7 925 258 0005', href: 'https://wa.me/79252580005' },
];

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 end-6 z-[9999] flex flex-col items-end gap-3">
      {/* Expanded number list */}
      {open && (
        <div className="flex flex-col gap-2 mb-2">
          {NUMBERS.map((num) => (
            <a
              key={num.href}
              href={num.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-[var(--color-text)] shadow-lg rounded-full px-4 py-2 text-sm font-medium hover:bg-[var(--color-off-white)] transition-colors border border-[var(--color-border)]"
            >
              <span>{num.flag}</span>
              <span>{num.label}</span>
            </a>
          ))}
        </div>
      )}

      {/* Main button with pulsing ring */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close WhatsApp menu' : 'Open WhatsApp menu'}
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
        {!open && (
          <>
            <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#25D366] opacity-60" />
            <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#25D366] opacity-40" style={{ animationDelay: '0.5s' }} />
          </>
        )}
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}

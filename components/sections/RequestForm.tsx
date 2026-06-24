'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { UploadCloud, FileText, X, Send } from 'lucide-react';

const COUNTRY_CODES = [
  'sa', 'ae', 'kw', 'qa', 'bh', 'om', 'eg', 'jo', 'iq', 'ye',
  'sd', 'sy', 'lb', 'ps', 'ly', 'dz', 'ma', 'tn', 'ru', 'other',
] as const;

const SPECIALTY_CODES = [
  'spec1', 'spec2', 'spec3', 'spec4', 'spec5', 'spec6', 'other',
] as const;

const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

interface RequestFormProps {
  source?: 'home' | 'blog';
  articleSlug?: string;
  locale?: string;
}

export default function RequestForm({ source = 'home', articleSlug, locale }: RequestFormProps) {
  const t = useTranslations('requestForm');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addFiles(incoming: FileList | null) {
    if (!incoming) return;
    const valid = Array.from(incoming).filter(
      (file) => ACCEPTED_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
    );
    setFiles((prev) => [...prev, ...valid]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set('source', source);
    if (articleSlug) fd.set('articleSlug', articleSlug);
    if (locale) fd.set('locale', locale);
    files.forEach((file) => fd.append('files', file));

    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch {
      setError(t('errorText'));
    } finally {
      setIsSubmitting(false);
    }
  }

  const labelClass = 'block text-sm font-medium text-[var(--color-text)] mb-1.5';
  const inputClass =
    'w-full bg-white border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-colors';

  return (
    <section id="request-form" className="py-16 sm:py-20 bg-[var(--color-off-white)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-3">
            {t('title')}
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-sm p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-10">
              <div className="inline-flex p-4 bg-[var(--color-accent)]/10 rounded-full mb-4">
                <Send size={28} className="text-[var(--color-accent)]" />
              </div>
              <h3 className="font-bold text-[var(--color-text)] text-lg mb-2">
                {t('successTitle')}
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm">{t('successText')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Full name */}
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="fullName">
                    {t('fullNameLabel')} *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder={t('fullNamePlaceholder')}
                    className={inputClass}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={labelClass} htmlFor="phone">
                    {t('phoneLabel')} *
                  </label>
                  <div className="flex" dir="ltr">
                    <span className="flex items-center justify-center px-3 shrink-0 rounded-s-xl border border-e-0 border-[var(--color-border)] bg-[var(--color-off-white)] text-sm text-[var(--color-text-muted)] font-medium">
                      +966
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder={t('phonePlaceholder')}
                      className="flex-1 min-w-0 bg-white border border-[var(--color-border)] rounded-e-xl px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-colors"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className={labelClass} htmlFor="country">
                    {t('countryLabel')} *
                  </label>
                  <select id="country" name="country" required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      {t('countryPlaceholder')}
                    </option>
                    {COUNTRY_CODES.map((code) => (
                      <option key={code} value={code}>
                        {t(`countries.${code}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Specialty */}
                <div>
                  <label className={labelClass} htmlFor="specialty">
                    {t('specialtyLabel')} *
                  </label>
                  <select id="specialty" name="specialty" required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      {t('specialtyPlaceholder')}
                    </option>
                    {SPECIALTY_CODES.map((code) => (
                      <option key={code} value={code}>
                        {t(`specialties.${code}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="notes">
                    {t('notesLabel')}
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder={t('notesPlaceholder')}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* File upload */}
              <div>
                <label className={labelClass}>{t('uploadLabel')} *</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`cursor-pointer rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
                    isDragging
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                      : 'border-[var(--color-border)] bg-[var(--color-off-white)] hover:border-[var(--color-primary)]/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => addFiles(e.target.files)}
                  />
                  <UploadCloud size={28} className="mx-auto mb-2 text-[var(--color-primary)]" />
                  <p className="text-sm font-medium text-[var(--color-text)]">{t('uploadCta')}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">{t('uploadFormats')}</p>
                </div>

                {files.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {files.map((file, i) => (
                      <li
                        key={`${file.name}-${i}`}
                        className="flex items-center justify-between gap-2 bg-[var(--color-off-white)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm"
                      >
                        <span className="flex items-center gap-2 text-[var(--color-text)] truncate">
                          <FileText size={16} className="text-[var(--color-primary)] shrink-0" />
                          <span className="truncate">{file.name}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="text-[var(--color-text-muted)] hover:text-red-500 transition-colors shrink-0"
                          aria-label={t('removeFile')}
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {error && (
                <p className="text-sm text-red-500" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold px-6 py-3 rounded-xl transition-colors disabled:opacity-60 shadow-lg"
              >
                <Send size={18} />
                <span>{isSubmitting ? t('submitting') : t('submitButton')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const TiptapEditor = dynamic(() => import('./TiptapEditor'), { ssr: false });

type Locale = 'ar' | 'en' | 'ru';

interface TranslationValue {
  title?: string;
  excerpt?: string;
  content?: string;
}

interface ArticleFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: {
    slug?: string;
    translations?: Partial<Record<Locale, TranslationValue>>;
    coverImage?: { url?: string };
  };
}

const LOCALE_LABELS: Record<Locale, string> = {
  ar: '🇸🇦 Arabic',
  en: '🇬🇧 English',
  ru: '🇷🇺 Russian',
};

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100);
}

function emptyTranslation(): Required<TranslationValue> {
  return { title: '', excerpt: '', content: '' };
}

export default function ArticleForm({ action, defaultValues }: ArticleFormProps) {
  const [slug, setSlug] = useState(defaultValues?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(!!defaultValues?.slug);

  const [translations, setTranslations] = useState<Record<Locale, Required<TranslationValue>>>({
    ar: { ...emptyTranslation(), ...defaultValues?.translations?.ar },
    en: { ...emptyTranslation(), ...defaultValues?.translations?.en },
    ru: { ...emptyTranslation(), ...defaultValues?.translations?.ru },
  });

  const [enabledLocales, setEnabledLocales] = useState<Record<Locale, boolean>>({
    ar: true,
    en: !!defaultValues?.translations?.en,
    ru: !!defaultValues?.translations?.ru,
  });

  const [activeTab, setActiveTab] = useState<Locale>('ar');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValues?.coverImage?.url ?? null);
  const [removeImage, setRemoveImage] = useState(false);

  const [isPending, startTransition] = useTransition();

  function updateField(locale: Locale, field: keyof TranslationValue, value: string) {
    setTranslations((prev) => ({ ...prev, [locale]: { ...prev[locale], [field]: value } }));
  }

  function handleTitleBlur() {
    if (!slugTouched && translations.ar.title) {
      setSlug(toSlug(translations.ar.title));
    }
  }

  function toggleLocale(locale: Locale) {
    if (locale === 'ar') return; // Arabic is always required
    setEnabledLocales((prev) => {
      const next = { ...prev, [locale]: !prev[locale] };
      if (next[locale]) setActiveTab(locale);
      else if (activeTab === locale) setActiveTab('ar');
      return next;
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setRemoveImage(false);
    if (file) setImagePreview(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData();
    fd.set('slug', slug);

    for (const locale of Object.keys(enabledLocales) as Locale[]) {
      if (!enabledLocales[locale]) continue;
      fd.set(`${locale}_title`, translations[locale].title);
      fd.set(`${locale}_excerpt`, translations[locale].excerpt);
      fd.set(`${locale}_content`, translations[locale].content);
    }

    if (imageFile) fd.set('image', imageFile);
    if (removeImage) fd.set('removeImage', 'true');

    startTransition(() => action(fd));
  }

  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';
  const inputClass =
    'w-full border border-[#D6E4F0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6DB5]/30 focus:border-[#1A6DB5]';

  const locales: Locale[] = ['ar', 'en', 'ru'];

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div>
        <label className={labelClass} htmlFor="slug">Slug (shared across all languages)</label>
        <input
          id="slug"
          type="text"
          required
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          className={inputClass}
          placeholder="article-slug"
        />
      </div>

      <div>
        <label className={labelClass}>Cover Image</label>
        {imagePreview ? (
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-[#D6E4F0]">
              <Image src={imagePreview} alt="Cover preview" fill className="object-cover" unoptimized />
            </div>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Remove image
            </button>
          </div>
        ) : (
          <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handleImageChange} className="text-sm" />
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 border-b border-[#D6E4F0]">
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => enabledLocales[locale] && setActiveTab(locale)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === locale
                  ? 'border-[#1A6DB5] text-[#1A6DB5]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              } ${!enabledLocales[locale] ? 'opacity-40' : ''}`}
            >
              {LOCALE_LABELS[locale]}
              {locale === 'ar' && <span className="text-red-500 ml-1">*</span>}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-3 pb-2">
            {locales
              .filter((l) => l !== 'ar')
              .map((locale) => (
                <label key={locale} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <input
                    type="checkbox"
                    checked={enabledLocales[locale]}
                    onChange={() => toggleLocale(locale)}
                  />
                  {locale.toUpperCase()}
                </label>
              ))}
          </div>
        </div>

        {locales.map((locale) =>
          enabledLocales[locale] ? (
            <div key={locale} className={`pt-6 space-y-4 ${activeTab === locale ? '' : 'hidden'}`}>
              <div>
                <label className={labelClass} htmlFor={`${locale}-title`}>Title</label>
                <input
                  id={`${locale}-title`}
                  type="text"
                  required={locale === 'ar'}
                  value={translations[locale].title}
                  onChange={(e) => updateField(locale, 'title', e.target.value)}
                  onBlur={locale === 'ar' ? handleTitleBlur : undefined}
                  className={inputClass}
                  placeholder="Article title"
                />
              </div>

              <div>
                <label className={labelClass} htmlFor={`${locale}-excerpt`}>Excerpt</label>
                <textarea
                  id={`${locale}-excerpt`}
                  required={locale === 'ar'}
                  rows={3}
                  value={translations[locale].excerpt}
                  onChange={(e) => updateField(locale, 'excerpt', e.target.value)}
                  className={inputClass}
                  placeholder="Short description for SEO and listing pages"
                />
              </div>

              <div>
                <label className={labelClass}>Content</label>
                <TiptapEditor
                  value={translations[locale].content}
                  onChange={(value) => updateField(locale, 'content', value)}
                />
              </div>
            </div>
          ) : null
        )}
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

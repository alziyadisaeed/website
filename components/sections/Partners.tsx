import { getTranslations } from 'next-intl/server';

interface PartnersProps {
  locale: string;
}

export default async function Partners({ locale }: PartnersProps) {
  const t = await getTranslations({ locale, namespace: 'partners' });
  const list = t.raw('list') as string[];

  return (
    <section className="py-16 sm:py-20 bg-[var(--color-off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-3">
            {t('title')}
          </h2>
          <p className="text-[var(--color-text-muted)]">{t('subtitle')}</p>
        </div>

        {/* Horizontal scrollable strip */}
        {/* <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max px-2">
            {list.map((name, i) => (
              <div
                key={i}
                className="flex-shrink-0 bg-white border border-[var(--color-border)] rounded-xl px-6 py-4 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all cursor-default grayscale hover:grayscale-0"
              >
                {name}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}

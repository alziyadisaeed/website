import { getTranslations } from 'next-intl/server';

interface FaqSectionProps {
  locale: string;
}

export default async function FaqSection({ locale }: FaqSectionProps) {
  const t = await getTranslations({ locale });
  const items = t.raw('faq') as Array<{ q: string; a: string }>;

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[var(--color-off-white)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text)]">
            {locale === 'ar' ? 'الأسئلة الشائعة' : locale === 'ru' ? 'Вопросы и ответы' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group bg-white border border-[var(--color-border)] rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-semibold text-[var(--color-text)] hover:bg-[var(--color-off-white)] transition-colors list-none">
                <span>{item.q}</span>
                <span className="shrink-0 w-6 h-6 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)] transition-transform group-open:rotate-45 font-bold">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 pt-2 text-[var(--color-text-muted)] leading-relaxed text-sm sm:text-base border-t border-[var(--color-border)]">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

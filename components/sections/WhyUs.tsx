import { Clock, Link2, MessageSquare, BadgeDollarSign } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface WhyUsProps {
  locale: string;
}

export default async function WhyUs({ locale }: WhyUsProps) {
  const t = await getTranslations({ locale, namespace: 'whyUs' });

  const rows = [
    { icon: Clock, title: t('row1Title'), desc: t('row1Desc'), align: 'left' },
    { icon: Link2, title: t('row2Title'), desc: t('row2Desc'), align: 'right' },
    { icon: MessageSquare, title: t('row3Title'), desc: t('row3Desc'), align: 'left' },
    { icon: BadgeDollarSign, title: t('row4Title'), desc: t('row4Desc'), align: 'right' },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text)]">
            {t('title')}
          </h2>
        </div>

        <div className="space-y-8">
          {rows.map((row, i) => (
            <div
              key={i}
              className={`flex flex-col sm:flex-row gap-6 items-start ${
                row.align === 'right' ? 'sm:flex-row-reverse' : ''
              }`}
            >
              <div className="shrink-0">
                <div className="w-16 h-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <row.icon size={28} />
                </div>
              </div>
              <div className={`flex-1 ${row.align === 'right' ? 'sm:text-end' : ''}`}>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">{row.title}</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{row.desc}</p>
              </div>
              <div className="hidden sm:flex items-center self-center">
                <div className="w-12 h-12 rounded-full border-4 border-[var(--color-border)] flex items-center justify-center font-bold text-[var(--color-primary)] text-lg">
                  {i + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

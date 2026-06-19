import { BedDouble, Utensils, Car, Landmark } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface TourismPartnersProps {
  locale: string;
}

export default async function TourismPartners({ locale }: TourismPartnersProps) {
  const t = await getTranslations({ locale, namespace: 'tourism' });

  const cards = [
    { icon: BedDouble, title: t('card1Title'), desc: t('card1Desc'), color: 'bg-blue-50 text-blue-600' },
    { icon: Utensils, title: t('card2Title'), desc: t('card2Desc'), color: 'bg-green-50 text-green-600' },
    { icon: Car, title: t('card3Title'), desc: t('card3Desc'), color: 'bg-teal-50 text-teal-600' },
    { icon: Landmark, title: t('card4Title'), desc: t('card4Desc'), color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text)]">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-xl shrink-0 ${card.color}`}>
                <card.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[var(--color-text)] mb-2">{card.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

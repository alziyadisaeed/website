import { Eye, Bone, Heart, Ribbon, Activity, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface SpecialtiesProps {
  locale: string;
}

export default async function Specialties({ locale }: SpecialtiesProps) {
  const t = await getTranslations({ locale, namespace: 'specialties' });

  const specialties = [
    { icon: Eye, title: t('spec1'), desc: t('spec1Desc') },
    { icon: Bone, title: t('spec2'), desc: t('spec2Desc') },
    { icon: Heart, title: t('spec3'), desc: t('spec3Desc') },
    { icon: Ribbon, title: t('spec4'), desc: t('spec4Desc') },
    { icon: Activity, title: t('spec5'), desc: t('spec5Desc') },
    { icon: Users, title: t('spec6'), desc: t('spec6Desc') },
  ];

  return (
    <section id="specialties" className="py-16 sm:py-20 bg-[var(--color-off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text)]">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialties.map((spec, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-[var(--color-border)] p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-t-4 hover:border-t-[var(--color-accent)]"
            >
              <div className="inline-flex p-3 bg-[var(--color-primary)]/10 rounded-xl mb-4 group-hover:bg-[var(--color-accent)]/10 transition-colors">
                <spec.icon size={28} className="text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors" />
              </div>
              <h3 className="font-bold text-[var(--color-text)] mb-2 text-sm sm:text-base">{spec.title}</h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{spec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

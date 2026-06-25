import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PlaneTakeoff, Hospital, HeartPulse, Check } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://alziyadimed.com';

const titles: Record<string, string> = {
  ar: 'خدماتنا | ألزيادي ميد',
  en: 'Our Services | AlziyadiMed',
  ru: 'Наши услуги | AlziyadiMed',
};

const descriptions: Record<string, string> = {
  ar: 'خدمات متكاملة للعلاج في روسيا: قبل السفر وأثناء الرحلة وبعد العلاج.',
  en: 'Comprehensive treatment in Russia services: before travel, during the journey, and after treatment.',
  ru: 'Комплексные услуги лечения в России: до поездки, во время и после лечения.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] ?? titles.ar,
    description: descriptions[locale] ?? descriptions.ar,
    alternates: {
      canonical: `${baseUrl}/${locale}/services`,
      languages: {
        ar: `${baseUrl}/ar/services`,
        en: `${baseUrl}/en/services`,
        ru: `${baseUrl}/ru/services`,
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }, { locale: 'ru' }];
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const breadcrumb = await getTranslations({ locale, namespace: 'breadcrumb' });

  const cards = [
    {
      icon: PlaneTakeoff,
      title: t('card1Title'),
      items: t.raw('card1Items') as string[],
      details: locale === 'ar'
        ? 'قبل مغادرتك، يتولى فريقنا تحليل ملفك الطبي بعناية، والتواصل مع أفضل الأطباء الروس المتخصصين في حالتك، وترتيب كل التفاصيل اللوجستية لضمان رحلة سلسة وآمنة.'
        : locale === 'ru'
        ? 'До вашего отъезда наша команда тщательно анализирует вашу медицинскую документацию, связывается с лучшими российскими специалистами по вашему случаю и организует все логистические детали для обеспечения плавной и безопасной поездки.'
        : 'Before your departure, our team carefully analyzes your medical file, contacts the best Russian doctors specialized in your condition, and arranges all logistics to ensure a smooth and safe journey.',
      color: 'from-blue-600 to-blue-800',
    },
    {
      icon: Hospital,
      title: t('card2Title'),
      items: t.raw('card2Items') as string[],
      details: locale === 'ar'
        ? 'طوال فترة علاجك في روسيا، نكون إلى جانبك. مترجمنا الطبي المتخصص يرافقك في كل موعد، وفريقنا يتابع مسار علاجك ويتواصل مع الفريق الطبي الروسي بشكل مستمر.'
        : locale === 'ru'
        ? 'На протяжении всего периода лечения в России мы рядом с вами. Наш специализированный медицинский переводчик сопровождает вас на каждый приём, а наша команда постоянно следит за ходом лечения и поддерживает связь с российским медицинским персоналом.'
        : 'Throughout your treatment period in Russia, we are by your side. Our specialized medical interpreter accompanies you to every appointment, and our team continuously monitors your treatment progress and communicates with the Russian medical team.',
      color: 'from-[#1A6DB5] to-[#3B8FD4]',
    },
    {
      icon: HeartPulse,
      title: t('card3Title'),
      items: t.raw('card3Items') as string[],
      details: locale === 'ar'
        ? 'عودتك إلى وطنك لا تعني نهاية رعايتنا لك. نواصل متابعتك عن بُعد، ونترجم تقارير ما بعد العلاج، وننسق مع طبيبك المحلي لضمان استمرار تعافيك على أكمل وجه.'
        : locale === 'ru'
        ? 'Ваше возвращение домой не означает конца нашей заботы о вас. Мы продолжаем дистанционное наблюдение, переводим послелечебные отчёты и координируем действия с вашим местным врачом для обеспечения полного восстановления.'
        : 'Your return home does not mean the end of our care for you. We continue remote follow-up, translate post-treatment reports, and coordinate with your local doctor to ensure your full recovery.',
      color: 'from-teal-600 to-[#00C2A8]',
    },
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: breadcrumb('home'),
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: breadcrumb('services'),
        item: `${baseUrl}/${locale}/services`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <section className="py-16 sm:py-20" style={{ background: 'linear-gradient(135deg, #0F1F3D 0%, #1A6DB5 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">{breadcrumb('home')}</Link>
            <span>/</span>
            <span className="text-white">{breadcrumb('services')}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg text-white/70 max-w-2xl">{descriptions[locale]}</p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {cards.map((card, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ${
                  i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={`bg-gradient-to-br ${card.color} rounded-2xl p-8 text-white ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <card.icon size={40} className="mb-4" />
                  <h2 className="text-2xl font-bold mb-3">{card.title}</h2>
                  <p className="text-white/80 leading-relaxed">{card.details}</p>
                </div>
                <div className={`p-8 bg-white rounded-2xl border border-[var(--color-border)] shadow-sm ${i % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-6">
                    {locale === 'ar' ? 'ما نقدمه:' : locale === 'ru' ? 'Что мы предоставляем:' : 'What we provide:'}
                  </h3>
                  <ul className="space-y-4">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check size={18} className="text-[var(--color-accent)] mt-0.5 shrink-0" />
                        <span className="text-[var(--color-text-muted)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[var(--color-off-white)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <a
            href="https://wa.me/79252500066"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg text-lg"
          >
            {nav('contact')}
          </a>
        </div>
      </section>
    </>
  );
}

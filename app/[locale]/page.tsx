import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Specialties from '@/components/sections/Specialties';
import WhyUs from '@/components/sections/WhyUs';
import Partners from '@/components/sections/Partners';
import TourismPartners from '@/components/sections/TourismPartners';
import FaqSection from '@/components/sections/FaqSection';
import RequestForm from '@/components/sections/RequestForm';
import ContactCTA from '@/components/sections/ContactCTA';
import JsonLd from '@/components/seo/JsonLd';
import { getTranslations } from 'next-intl/server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://drsaeedalziyadi.com';

const titles: Record<string, string> = {
  ar: 'الدكتور سعيد الزيادي | السياحة الطبية في روسيا',
  en: 'Dr. Saeed Alziyadi | Medical Tourism Russia',
  ru: 'Доктор Саид Аль-Зияди | Медицинский туризм в России',
};

const descriptions: Record<string, string> = {
  ar: 'خدمات السياحة العلاجية المتكاملة إلى روسيا للمرضى العرب. تنسيق طبي، ترجمة، إقامة، وما بعد العلاج.',
  en: 'Comprehensive medical tourism services to Russia for Arab patients. Medical coordination, translation, accommodation, and post-treatment support.',
  ru: 'Комплексные услуги медицинского туризма в Россию для арабских пациентов. Медицинская координация, перевод, проживание и послелечебное сопровождение.',
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
      canonical: `${baseUrl}/${locale}`,
      languages: {
        ar: `${baseUrl}/ar`,
        en: `${baseUrl}/en`,
        ru: `${baseUrl}/ru`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.ar,
      description: descriptions[locale] ?? descriptions.ar,
      url: `${baseUrl}/${locale}`,
      siteName: 'Dr. Saeed Alziyadi Medical Tourism',
      locale: locale,
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }, { locale: 'ru' }];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const faqItems = t.raw('faq') as Array<{ q: string; a: string }>;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: titles[locale],
    description: descriptions[locale],
    provider: {
      '@type': 'MedicalOrganization',
      name: 'Dr. Saeed Alziyadi Medical Tourism',
      url: baseUrl,
    },
    areaServed: ['RU', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM'],
    serviceType: 'Medical Tourism',
  };

  return (
    <>
      <JsonLd data={[faqJsonLd, serviceJsonLd]} />
      <Hero locale={locale} />
      <About locale={locale} />
      <Services locale={locale} />
      <Specialties locale={locale} />
      <WhyUs locale={locale} />
      <Partners locale={locale} />
      <TourismPartners locale={locale} />
      <FaqSection locale={locale} />
      <RequestForm />
      <ContactCTA locale={locale} />
    </>
  );
}

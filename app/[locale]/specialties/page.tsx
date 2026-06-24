import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Eye, Bone, Heart, Ribbon, Activity, Users } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://alziyadimed.com';

const titles: Record<string, string> = {
  ar: 'التخصصات الطبية | ألزيادي ميد',
  en: 'Medical Specialties | AlziyadiMed',
  ru: 'Медицинские специализации | AlziyadiMed',
};

const descriptions: Record<string, string> = {
	ar: "تخصصات طبية متميزة في روسيا: طب العيون، العظام، القلب، الأورام، الأعصاب، وإعادة التأهيل.",
	en: "Exceptional medical specialties in Russia: Ophthalmology, Orthopedics, Cardiology, Oncology, Neurology, and Rehabilitation.",
	ru: "Исключительные медицинские специализации в России: офтальмология, ортопедия, кардиология, онкология, нейрохирургия и реабилитация.",
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
      canonical: `${baseUrl}/${locale}/specialties`,
      languages: {
        ar: `${baseUrl}/ar/specialties`,
        en: `${baseUrl}/en/specialties`,
        ru: `${baseUrl}/ru/specialties`,
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }, { locale: 'ru' }];
}

export default async function SpecialtiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'specialties' });
  const breadcrumb = await getTranslations({ locale, namespace: 'breadcrumb' });

  const detailsMap: Record<string, string[]> = {
    ar: [
      'تتميز المستشفيات الروسية بأحدث تقنيات جراحة العيون، بما في ذلك الليزك المتطور، وتصحيح الإبصار بالليزر الفيمتوثانية، وزرع العدسات متعددة البؤر. تحقق نسب نجاح تصل إلى 98%.',
      'تعتبر روسيا من أكثر الدول تقدماً في جراحة العظام وتركيب المفاصل الاصطناعية. تُستخدم أحدث تقنيات الحد الأدنى من الجراحة بأسعار تنافسية مقارنة بأوروبا.',
      'تحتضن موسكو عدة مراكز قلب متخصصة بمستوى عالمي تقدم خدمات القسطرة والجراحة المفتوحة وتركيب الصمامات والأجهزة الإيقاعية باحترافية عالية.',
      'تتقدم أبحاث علاج السرطان في روسيا بخطى متسارعة. تتوفر أحدث بروتوكولات العلاج الكيميائي والمناعي والإشعاعي في مراكز متخصصة.',
      'تتمتع روسيا بكفاءة عالية في جراحات الدماغ والأعصاب الشوكية، بالإضافة إلى علاج الأمراض العصبية التنكسية كالشلل الرعاش والتصلب اللويحي.',
      'تقدم روسيا برامج إعادة تأهيل متطورة بعد الجلطات الدماغية والعمليات الجراحية، مع توفير الأطراف الصناعية الحديثة وفرق إعادة تأهيل متخصصة.',
    ],
    en: [
      'Russian hospitals excel in the latest eye surgery technologies, including advanced LASIK, femtosecond laser vision correction, and multifocal intraocular lens implantation. Success rates reach up to 98%.',
      'Russia is among the most advanced countries in orthopedic surgery and joint replacement. The latest minimally invasive techniques are used at competitive prices compared to Europe.',
      'Moscow hosts several world-class specialized cardiac centers offering catheterization, open-heart surgery, valve replacement, and pacemaker implantation with high professionalism.',
      'Cancer treatment research in Russia is advancing rapidly. The latest chemotherapy, immunotherapy, and radiotherapy protocols are available at specialized centers.',
      'Russia has high expertise in brain and spinal cord surgeries, as well as treating neurodegenerative diseases such as Parkinson\'s disease and multiple sclerosis.',
      'Russia offers advanced rehabilitation programs after strokes and surgeries, with modern prosthetic limbs and specialized rehabilitation teams.',
    ],
    ru: [
      'Российские больницы превосходят по уровню новейших технологий глазной хирургии, включая передовой LASIK, фемтосекундную лазерную коррекцию зрения и мультифокальные интраокулярные линзы. Показатели успеха достигают 98%.',
      'Россия входит в число наиболее передовых стран в области ортопедической хирургии и протезирования суставов. Применяются новейшие малоинвазивные методики по конкурентным ценам по сравнению с Европой.',
      'В Москве расположено несколько специализированных кардиологических центров мирового уровня, предоставляющих услуги катетеризации, операции на открытом сердце, замены клапанов и кардиостимуляторов.',
      'Исследования в области лечения онкологических заболеваний в России стремительно развиваются. В специализированных центрах доступны новейшие протоколы химиотерапии, иммунотерапии и лучевой терапии.',
      'Россия обладает высокими компетенциями в области хирургии головного и спинного мозга, а также в лечении нейродегенеративных заболеваний, таких как болезнь Паркинсона и рассеянный склероз.',
      'Россия предлагает передовые программы реабилитации после инсультов и операций, с современными протезами и специализированными реабилитационными командами.',
    ],
  };

  const specialties = [
    { icon: Eye, title: t('spec1'), desc: t('spec1Desc'), details: detailsMap[locale]?.[0] ?? '' },
    { icon: Bone, title: t('spec2'), desc: t('spec2Desc'), details: detailsMap[locale]?.[1] ?? '' },
    { icon: Heart, title: t('spec3'), desc: t('spec3Desc'), details: detailsMap[locale]?.[2] ?? '' },
    { icon: Ribbon, title: t('spec4'), desc: t('spec4Desc'), details: detailsMap[locale]?.[3] ?? '' },
    { icon: Activity, title: t('spec5'), desc: t('spec5Desc'), details: detailsMap[locale]?.[4] ?? '' },
    { icon: Users, title: t('spec6'), desc: t('spec6Desc'), details: detailsMap[locale]?.[5] ?? '' },
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
        name: breadcrumb('specialties'),
        item: `${baseUrl}/${locale}/specialties`,
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
            <span className="text-white">{breadcrumb('specialties')}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg text-white/70 max-w-2xl">{descriptions[locale]}</p>
        </div>
      </section>

      {/* Specialties grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((spec, i) => (
              <div key={i} className="group bg-white rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-all overflow-hidden">
                <div className="p-6 border-b border-[var(--color-border)] flex items-center gap-4">
                  <div className="p-3 bg-[var(--color-primary)]/10 rounded-xl">
                    <spec.icon size={28} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[var(--color-text)] text-lg">{spec.title}</h2>
                    <p className="text-sm text-[var(--color-text-muted)]">{spec.desc}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{spec.details}</p>
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
            {locale === 'ar' ? 'تواصل معنا' : locale === 'ru' ? 'Связаться с нами' : 'Contact Us'}
          </a>
        </div>
      </section>
    </>
  );
}

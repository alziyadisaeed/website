import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://drsaeedalziyadi.com';

const titles: Record<string, string> = {
  ar: 'الأسئلة الشائعة | الدكتور سعيد الزيادي',
  en: 'FAQ | Dr. Saeed Alziyadi',
  ru: 'Вопросы и ответы | Доктор Саид Аль-Зияди',
};

const descriptions: Record<string, string> = {
	ar: "إجابات على أكثر الأسئلة شيوعاً حول السياحة الطبية في روسيا مع فريق شركة الدكتور سعيد الزيادي.",
	en: "Answers to the most common questions about medical tourism in Russia with Dr. Saeed Alziyadi.",
	ru: "Ответы на наиболее часто задаваемые вопросы о медицинском туризме в России с доктором Саидом Аль-Зияди.",
};

type FaqItem = { q: string; a: string };

const extraFaqs: Record<string, FaqItem[][]> = {
  ar: [
    [
      { q: 'ما هي مدة البقاء المعتادة لرحلة العلاج في روسيا؟', a: 'تتراوح مدة البقاء بين 7 و 45 يوماً حسب نوع العلاج. الفحوصات الأولية 3-7 أيام، العمليات البسيطة 7-14 يوماً، والعمليات الكبرى 3-6 أسابيع.' },
      { q: 'هل يمكن مرافقة أحد أفراد الأسرة؟', a: 'نعم، نشجع على إحضار مرافق. نساعد في إجراءات تأشيرته وترتيب إقامته بأسعار مناسبة قريباً من مكان علاجك.' },
      { q: 'كيف يتم التعامل مع حالات الطوارئ؟', a: 'لدينا خط طوارئ يعمل 24/7 باللغة العربية. في حال أي طارئ طبي، يتدخل فريقنا فوراً بالتنسيق مع المستشفى.' },
      { q: 'ما هي المدفوعات المقبولة؟', a: 'نقبل التحويلات البنكية، والدفع النقدي، وبعض وسائل الدفع الإلكترونية. يمكن تقسيط المدفوعات لبعض الحالات عند الاتفاق المسبق.' },
    ],
    [
      { q: 'هل يمكن الحصول على استشارة طبية عن بُعد قبل السفر؟', a: 'نعم، نوفر جلسات استشارة بالفيديو مع الأطباء الروس المتخصصين قبل السفر. يساعد ذلك في تحديد خطة العلاج الأنسب ومدة الإقامة المطلوبة.' },
      { q: 'هل الطعام الحلال متوفر في روسيا؟', a: 'نعم، موسكو تضم العديد من مطاعم الطعام الحلال الموثوقة. نتولى تنسيق التوصيل إلى مكان إقامتك عند الحاجة.' },
      { q: 'ما هو الفرق في الجودة بين روسيا والدول الغربية؟', a: 'الجودة الطبية في روسيا تنافس أوروبا الغربية في مجالات كثيرة. كثير من الأطباء الروس حاصلون على تدريب دولي. الميزة الأكبر هي التكلفة المنخفضة دون التنازل عن الجودة.' },
      { q: 'كيف يتم ضمان سرية المعلومات الطبية؟', a: 'نحن ملتزمون بأعلى معايير سرية المعلومات الطبية. بياناتك لا تُشارك مع أي جهة ثالثة دون إذنك الصريح.' },
    ],
  ],
  en: [
    [
      { q: 'How long is a typical treatment stay in Russia?', a: 'Length of stay ranges from 7 to 45 days depending on the treatment type. Initial examinations: 3-7 days, minor procedures: 7-14 days, major surgeries: 3-6 weeks.' },
      { q: 'Can a family member accompany me?', a: 'Yes, we encourage bringing a companion. We assist with their visa procedures and arrange nearby accommodation at appropriate prices.' },
      { q: 'How are emergencies handled?', a: 'We have a 24/7 emergency line in Arabic. In case of any medical emergency, our team immediately intervenes in coordination with the hospital.' },
      { q: 'What payment methods are accepted?', a: 'We accept bank transfers, cash, and some electronic payment methods. Installment payments are available for some cases with prior agreement.' },
    ],
    [
      { q: 'Can I get a remote medical consultation before traveling?', a: 'Yes, we provide video consultation sessions with specialized Russian doctors before travel. This helps determine the most suitable treatment plan and required length of stay.' },
      { q: 'Is halal food available in Russia?', a: 'Yes, Moscow has many reliable halal restaurants. We coordinate delivery to your accommodation when needed.' },
      { q: 'What is the quality difference between Russia and Western countries?', a: 'Medical quality in Russia competes with Western Europe in many fields. Many Russian doctors have international training. The biggest advantage is lower cost without compromising quality.' },
      { q: 'How is the confidentiality of medical information ensured?', a: 'We are committed to the highest standards of medical confidentiality. Your data is not shared with any third party without your explicit consent.' },
    ],
  ],
  ru: [
    [
      { q: 'Как долго обычно длится лечение в России?', a: 'Продолжительность пребывания варьируется от 7 до 45 дней в зависимости от вида лечения. Первичные обследования: 3-7 дней, малые процедуры: 7-14 дней, крупные операции: 3-6 недель.' },
      { q: 'Может ли меня сопровождать член семьи?', a: 'Да, мы рекомендуем взять сопровождающего. Мы помогаем с оформлением его визы и организуем проживание рядом по приемлемым ценам.' },
      { q: 'Как решаются экстренные ситуации?', a: 'У нас есть круглосуточная горячая линия на арабском языке. В случае любой медицинской экстренной ситуации наша команда немедленно вмешивается в координации с больницей.' },
      { q: 'Какие способы оплаты принимаются?', a: 'Мы принимаем банковские переводы, наличные и некоторые электронные способы оплаты. Рассрочка возможна для ряда случаев при предварительном согласовании.' },
    ],
    [
      { q: 'Можно ли получить удалённую медицинскую консультацию до поездки?', a: 'Да, мы организуем видеоконсультации со специализированными российскими врачами до поездки. Это помогает определить оптимальный план лечения и необходимую продолжительность пребывания.' },
      { q: 'Доступна ли халяльная еда в России?', a: 'Да, в Москве есть много проверенных халяльных ресторанов. При необходимости мы организуем доставку по месту вашего проживания.' },
      { q: 'В чём разница в качестве между Россией и западными странами?', a: 'Качество медицинской помощи в России во многих областях конкурирует с Западной Европой. Многие российские врачи имеют международную подготовку. Главное преимущество — низкая стоимость без ущерба для качества.' },
      { q: 'Как обеспечивается конфиденциальность медицинской информации?', a: 'Мы придерживаемся высочайших стандартов медицинской конфиденциальности. Ваши данные не передаются третьим лицам без вашего явного согласия.' },
    ],
  ],
};

const sectionTitles: Record<string, string[]> = {
  ar: ['قبل السفر', 'أثناء العلاج', 'بعد العودة', 'التكاليف والتأشيرة', 'أسئلة متنوعة'],
  en: ['Before Travel', 'During Treatment', 'After Return', 'Cost & Visa', 'General Questions'],
  ru: ['До поездки', 'Во время лечения', 'После возвращения', 'Стоимость и виза', 'Общие вопросы'],
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
      canonical: `${baseUrl}/${locale}/faq`,
      languages: {
        ar: `${baseUrl}/ar/faq`,
        en: `${baseUrl}/en/faq`,
        ru: `${baseUrl}/ru/faq`,
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }, { locale: 'ru' }];
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const breadcrumb = await getTranslations({ locale, namespace: 'breadcrumb' });

  const baseItems = t.raw('faq') as FaqItem[];
  const extraSections = extraFaqs[locale] ?? extraFaqs.en;

  // Split base items across sections
  const section1 = baseItems.slice(0, 4);
  const section2 = baseItems.slice(4, 8);
  const section3 = extraSections[0] ?? [];
  const section4 = extraSections[1] ?? [];

  const allSections = [section1, section2, section3, section4];
  const secTitles = sectionTitles[locale] ?? sectionTitles.en;

  const allFaqs = baseItems.concat(section3, section4);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: breadcrumb('home'), item: `${baseUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: breadcrumb('faq'), item: `${baseUrl}/${locale}/faq` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd, faqJsonLd]} />

      {/* Hero */}
      <section className="py-16 sm:py-20" style={{ background: 'linear-gradient(135deg, #0F1F3D 0%, #1A6DB5 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">{breadcrumb('home')}</Link>
            <span>/</span>
            <span className="text-white">{breadcrumb('faq')}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{titles[locale]?.split('|')[0].trim()}</h1>
          <p className="text-lg text-white/70 max-w-2xl">{descriptions[locale]}</p>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {allSections.map((section, si) => (
            <div key={si} className="mb-12">
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-6 pb-3 border-b-2 border-[var(--color-primary)]">
                {secTitles[si]}
              </h2>
              <div className="space-y-3">
                {section.map((item, i) => (
                  <details key={i} className="group bg-white border border-[var(--color-border)] rounded-xl overflow-hidden">
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
          ))}
        </div>
      </section>
    </>
  );
}

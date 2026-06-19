import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://drsaeedalziyadi.com';

const titles: Record<string, string> = {
  ar: 'تواصل معنا | د. سعيد الزيادي للسياحة العلاجية',
  en: 'Contact Us | Dr. Saeed Alziyadi Medical Tourism',
  ru: 'Контакты | Медицинский туризм Доктора Саида',
};

const descriptions: Record<string, string> = {
  ar: 'تواصل مع فريق د. سعيد الزيادي عبر واتساب أو البريد الإلكتروني. نرد بالعربية والإنجليزية والروسية.',
  en: 'Contact Dr. Saeed Alziyadi team via WhatsApp or email. We reply in Arabic, English, and Russian.',
  ru: 'Свяжитесь с командой доктора Саида Аль-Зияди через WhatsApp или email. Отвечаем на арабском, английском и русском.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        ar: `${baseUrl}/ar/contact`,
        en: `${baseUrl}/en/contact`,
        ru: `${baseUrl}/ru/contact`,
        'x-default': `${baseUrl}/ar/contact`,
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }, { locale: 'ru' }];
}

const content: Record<string, {
  heading: string;
  subheading: string;
  waHeading: string;
  emailHeading: string;
  addressHeading: string;
  hoursHeading: string;
  hours: string;
  address: string;
}> = {
  ar: {
    heading: 'تواصل معنا',
    subheading: 'فريقنا متاح على مدار الساعة للرد على استفساراتك وتنظيم رحلتك العلاجية',
    waHeading: 'واتساب',
    emailHeading: 'البريد الإلكتروني',
    addressHeading: 'العنوان',
    hoursHeading: 'ساعات العمل',
    hours: '24/7 — على مدار الساعة طوال أيام الأسبوع',
    address: 'موسكو، روسيا الاتحادية',
  },
  en: {
    heading: 'Contact Us',
    subheading: 'Our team is available 24/7 to answer your questions and organize your treatment journey',
    waHeading: 'WhatsApp',
    emailHeading: 'Email',
    addressHeading: 'Address',
    hoursHeading: 'Working Hours',
    hours: '24/7 — Around the clock, every day',
    address: 'Moscow, Russian Federation',
  },
  ru: {
    heading: 'Свяжитесь с нами',
    subheading: 'Наша команда доступна круглосуточно для ответов на ваши вопросы и организации лечебной поездки',
    waHeading: 'WhatsApp',
    emailHeading: 'Электронная почта',
    addressHeading: 'Адрес',
    hoursHeading: 'Часы работы',
    hours: '24/7 — Круглосуточно, каждый день',
    address: 'Москва, Российская Федерация',
  },
};

const breadcrumbJsonLd = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/${locale}` },
    { '@type': 'ListItem', position: 2, name: content[locale]?.heading ?? 'Contact', item: `${baseUrl}/${locale}/contact` },
  ],
});

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = content[locale] ?? content.en;

  return (
		<>
			<JsonLd data={breadcrumbJsonLd(locale)} />
			<div className="min-h-screen bg-[var(--color-off-white)]">
				{/* Header */}
				<div
					className="py-16 sm:py-20 text-white text-center"
					style={{ background: "linear-gradient(135deg, #0F1F3D 0%, #1A6DB5 100%)" }}
				>
					<div className="max-w-3xl mx-auto px-4">
						<h1 className="text-3xl sm:text-4xl font-bold mb-4">{c.heading}</h1>
						<p className="text-white/80 text-lg">{c.subheading}</p>
					</div>
				</div>

				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
						{/* WhatsApp numbers */}
						<div className="bg-white rounded-2xl p-6 border border-[var(--color-border)] shadow-sm">
							<div className="w-10 h-10 bg-[#25D366]/10 rounded-xl flex items-center justify-center mb-4">
								<Phone size={20} className="text-[#25D366]" />
							</div>
							<h2 className="font-bold text-[var(--color-text)] mb-3">
								{c.waHeading}
							</h2>
							<div className="space-y-2">
								{[
									{
										flag: "🇷🇺",
										num: "+7 925 250 0066",
										href: "https://wa.me/79252500066",
									},
									{
										flag: "🇺",
										num: "+7 925 258 0005",
										href: "https://wa.me/79252580005",
									},
								].map(({ flag, num, href }) => (
									<a
										key={num}
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-light)] text-sm font-medium transition-colors"
									>
										<span>{flag}</span>
										<span dir="ltr">{num}</span>
									</a>
								))}
							</div>
						</div>

						{/* Email */}
						<div className="bg-white rounded-2xl p-6 border border-[var(--color-border)] shadow-sm">
							<div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center mb-4">
								<Mail size={20} className="text-[var(--color-primary)]" />
							</div>
							<h2 className="font-bold text-[var(--color-text)] mb-3">
								{c.emailHeading}
							</h2>
							<a
								href="mailto:drsaeedalziyadi@gmail.com"
								className="text-[var(--color-primary)] hover:text-[var(--color-primary-light)] text-sm font-medium transition-colors break-all"
							>
								drsaeedalziyadi@gmail.com
							</a>
						</div>

						{/* Address */}
						<div className="bg-white rounded-2xl p-6 border border-[var(--color-border)] shadow-sm">
							<div className="w-10 h-10 bg-[var(--color-accent)]/10 rounded-xl flex items-center justify-center mb-4">
								<MapPin size={20} className="text-[var(--color-accent)]" />
							</div>
							<h2 className="font-bold text-[var(--color-text)] mb-3">
								{c.addressHeading}
							</h2>
							<p className="text-[var(--color-text-muted)] text-sm">{c.address}</p>
							<div className="mt-3">
								<p className="text-xs font-medium text-[var(--color-text-muted)]">
									{c.hoursHeading}
								</p>
								<p className="text-sm text-[var(--color-text)] mt-1">{c.hours}</p>
							</div>
						</div>
					</div>

					{/* Large CTA */}
					<div
						className="rounded-2xl p-10 text-white text-center"
						style={{ background: "linear-gradient(135deg, #1A6DB5 0%, #00C2A8 100%)" }}
					>
						<h2 className="text-2xl sm:text-3xl font-bold mb-4">
							{locale === "ar"
								? "ابدأ رحلتك العلاجية اليوم"
								: locale === "ru"
									? "Начните лечебную поездку сегодня"
									: "Start Your Treatment Journey Today"}
						</h2>
						<p className="text-white/80 mb-8">
							{locale === "ar"
								? "تواصل معنا الآن عبر واتساب — نرد بالعربية والإنجليزية والروسية"
								: locale === "ru"
									? "Свяжитесь с нами через WhatsApp — отвечаем на арабском, английском и русском"
									: "Contact us now on WhatsApp — we reply in Arabic, English, and Russian"}
						</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							{[
								{
									flag: "🇷🇺",
									num: "+7 925 250 0066",
									href: "https://wa.me/79252500066",
								},
								{
									flag: "🇺",
									num: "+7 925 258 0005",
									href: "https://wa.me/79252580005",
								},
							].map(({ flag, num, href }) => (
								<a
									key={num}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 border border-white/40 text-white font-semibold px-5 py-3 rounded-xl transition-colors backdrop-blur-sm"
								>
									<span>{flag}</span>
									<span dir="ltr" className="text-sm">
										{num}
									</span>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
  );
}

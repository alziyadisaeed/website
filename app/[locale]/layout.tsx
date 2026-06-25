import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Noto_Naskh_Arabic, Noto_Sans_Arabic, Playfair_Display, DM_Sans } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import JsonLd from '@/components/seo/JsonLd';

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic-serif',
  display: 'swap',
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://Alziyadi Med.com"),
	icons: {
		icon: [
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
	},
};

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }, { locale: 'ru' }];
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://Alziyadi Med.com";

const organizationJsonLd = {
	"@context": "https://schema.org",
	"@type": "MedicalOrganization",
	name: "Alziyadi Med",
	url: baseUrl,
	logo: `${baseUrl}/logo.png`,
	address: {
		"@type": "PostalAddress",
		addressLocality: "Moscow",
		addressCountry: "RU",
	},
	contactPoint: [
		{
			"@type": "ContactPoint",
			telephone: "+79252500066",
			contactType: "customer service",
			contactOption: "TollFree",
			availableLanguage: ["Arabic", "Russian", "English"],
		},
	],
	sameAs: [],
};

const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Dr. Saeed Alziyadi",
	jobTitle: "Treatment in Russia Specialist",
	worksFor: {
		"@type": "MedicalOrganization",
		name: "Alziyadi Med",
	},
	url: baseUrl,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const isArabic = locale === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  const fontVars = isArabic
    ? `${notoNaskhArabic.variable} ${notoSansArabic.variable}`
    : `${playfair.variable} ${dmSans.variable}`;

  return (
    <html lang={locale} dir={dir} className={fontVars}>
      <head>
        <JsonLd data={[organizationJsonLd, personJsonLd]} />
      </head>
      <body
        style={{
          fontFamily: isArabic
            ? 'var(--font-arabic-sans), var(--font-arabic-serif), sans-serif'
            : 'var(--font-sans), var(--font-serif), sans-serif',
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

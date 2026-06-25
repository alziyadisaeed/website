import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://Alziyadi Med.com";

const titles: Record<string, string> = {
	ar: "سياسة الخصوصية | الزيادي ميد للعلاج في روسيا",
	en: "Privacy Policy | Alziyadi Med Treatment in Russia",
	ru: "Политика конфиденциальности | Лечение в России Alziyadi Med",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] ?? titles.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy-policy`,
      languages: {
        ar: `${baseUrl}/ar/privacy-policy`,
        en: `${baseUrl}/en/privacy-policy`,
        ru: `${baseUrl}/ru/privacy-policy`,
        'x-default': `${baseUrl}/ar/privacy-policy`,
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }, { locale: 'ru' }];
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale === 'ar') {
    return (
		<div className="min-h-screen bg-[var(--color-off-white)] py-16">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold text-[var(--color-text)] mb-8">سياسة الخصوصية</h1>
				<div className="bg-white rounded-2xl p-8 border border-[var(--color-border)] space-y-6 text-[var(--color-text-muted)] leading-relaxed">
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">
							ما البيانات التي نجمعها؟
						</h2>
						<p>
							لا نجمع أي بيانات شخصية تلقائياً. التواصل معنا يتم عبر واتساب أو البريد
							الإلكتروني فقط، وتُخزَّن هذه المعلومات على منصات تلك الخدمات حصراً وتخضع
							لسياساتها.
						</p>
					</section>
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">
							التحليلات
						</h2>
						<p>
							نستخدم <strong>Plausible Analytics</strong>، وهي أداة تحليل خالية من
							ملفات تعريف الارتباط (Cookies). لا تُجمَع أي بيانات شخصية ولا تحتاج إلى
							موافقتك المسبقة.
						</p>
					</section>
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">
							ملفات تعريف الارتباط (Cookies)
						</h2>
						<p>
							لا يستخدم موقعنا ملفات تعريف الارتباط لأغراض التتبع أو الإعلانات. لذلك
							لا تظهر أي نافذة لطلب الموافقة.
						</p>
					</section>
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">
							مشاركة البيانات
						</h2>
						<p>لا نبيع بياناتك ولا نشاركها مع أي طرف ثالث لأغراض تجارية أو إعلانية.</p>
					</section>
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">التواصل</h2>
						<p>
							لأي استفسار حول هذه السياسة، تواصل معنا على:{" "}
							<a
								href="mailto:info@alziyadimed.com"
								className="text-[var(--color-primary)]"
							>
								info@alziyadimed.com
							</a>
						</p>
					</section>
					<p className="text-sm text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-4">
						آخر تحديث: يناير 2025
					</p>
				</div>
			</div>
		</div>
	);
  }

  if (locale === 'ru') {
    return (
		<div className="min-h-screen bg-[var(--color-off-white)] py-16">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold text-[var(--color-text)] mb-8">
					Политика конфиденциальности
				</h1>
				<div className="bg-white rounded-2xl p-8 border border-[var(--color-border)] space-y-6 text-[var(--color-text-muted)] leading-relaxed">
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">
							Какие данные мы собираем?
						</h2>
						<p>
							Мы не собираем персональные данные автоматически. Связь с нами
							осуществляется через WhatsApp или электронную почту, и эти данные
							хранятся исключительно на платформах соответствующих сервисов.
						</p>
					</section>
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">
							Аналитика
						</h2>
						<p>
							Мы используем <strong>Plausible Analytics</strong> — инструмент
							аналитики без файлов cookie. Персональные данные не собираются, и ваше
							согласие не требуется.
						</p>
					</section>
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">
							Файлы cookie
						</h2>
						<p>
							Наш сайт не использует файлы cookie для отслеживания или рекламы.
							Поэтому баннер с запросом согласия не отображается.
						</p>
					</section>
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">
							Передача данных
						</h2>
						<p>
							Мы не продаём и не передаём ваши данные третьим лицам в коммерческих или
							рекламных целях.
						</p>
					</section>
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">
							Контакты
						</h2>
						<p>
							По вопросам данной политики пишите нам:{" "}
							<a
								href="mailto:info@alziyadimed.com"
								className="text-[var(--color-primary)]"
							>
								info@alziyadimed.com
							</a>
						</p>
					</section>
					<p className="text-sm text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-4">
						Последнее обновление: январь 2025
					</p>
				</div>
			</div>
		</div>
	);
  }

  return (
		<div className="min-h-screen bg-[var(--color-off-white)] py-16">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold text-[var(--color-text)] mb-8">Privacy Policy</h1>
				<div className="bg-white rounded-2xl p-8 border border-[var(--color-border)] space-y-6 text-[var(--color-text-muted)] leading-relaxed">
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">
							What data do we collect?
						</h2>
						<p>
							We do not automatically collect any personal data. All communication
							happens via WhatsApp or email, and that information is stored solely on
							the platforms of those services, subject to their own privacy policies.
						</p>
					</section>
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">
							Analytics
						</h2>
						<p>
							We use <strong>Plausible Analytics</strong>, a cookie-free analytics
							tool. No personal data is collected and no consent banner is required.
						</p>
					</section>
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">Cookies</h2>
						<p>
							This site does not use cookies for tracking or advertising purposes. No
							consent popup is shown to visitors.
						</p>
					</section>
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">
							Data Sharing
						</h2>
						<p>
							We do not sell or share your data with any third parties for commercial
							or advertising purposes.
						</p>
					</section>
					<section>
						<h2 className="text-xl font-bold text-[var(--color-text)] mb-3">Contact</h2>
						<p>
							For any questions regarding this policy, contact us at:{" "}
							<a
								href="mailto:info@alziyadimed.com"
								className="text-[var(--color-primary)]"
							>
								info@alziyadimed.com
							</a>
						</p>
					</section>
					<p className="text-sm text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-4">
						Last updated: January 2025
					</p>
				</div>
			</div>
		</div>
  );
}

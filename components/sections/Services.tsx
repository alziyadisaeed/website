import { PlaneTakeoff, Hospital, HeartPulse, Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface ServicesProps {
  locale: string;
}

export default async function Services({ locale }: ServicesProps) {
  const t = await getTranslations({ locale, namespace: 'services' });

  const cards = [
    {
      icon: PlaneTakeoff,
      title: t('card1Title'),
      items: t.raw('card1Items') as string[],
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: Hospital,
      title: t('card2Title'),
      items: t.raw('card2Items') as string[],
      color: 'from-[var(--color-primary)] to-[var(--color-primary-light)]',
    },
    {
      icon: HeartPulse,
      title: t('card3Title'),
      items: t.raw('card3Items') as string[],
      color: 'from-teal-500 to-[var(--color-accent)]',
    },
  ];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://Alziyadi Med.com";

  return (
		<section id="services" className="py-16 sm:py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text)]">
						{t("title")}
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{cards.map((card, i) => (
						<div
							key={i}
							className="group bg-white rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
						>
							<div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
								<card.icon size={32} className="mb-3" />
								<h3 className="text-xl font-bold">{card.title}</h3>
							</div>
							<ul className="p-6 space-y-3">
								{card.items.map((item, j) => (
									<li key={j} className="flex items-start gap-3">
										<Check
											size={16}
											className="text-[var(--color-accent)] mt-0.5 shrink-0"
										/>
										<span className="text-sm text-[var(--color-text-muted)]">
											{item}
										</span>
									</li>
								))}
							</ul>
							{/* Service JSON-LD */}
							<script
								type="application/ld+json"
								dangerouslySetInnerHTML={{
									__html: JSON.stringify({
										"@context": "https://schema.org",
										"@type": "Service",
										name: card.title,
										provider: {
											"@type": "Organization",
											name: "Alziyadi Med Treatment in Russia",
											url: baseUrl,
										},
										areaServed: ["RU", "SA", "AE", "KW", "QA", "BH", "OM"],
										description: card.items.join(". "),
									}),
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
  );
}

import Image from 'next/image';
import { Award, Languages, Building2, HeartHandshake } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface AboutProps {
  locale: string;
}

export default async function About({ locale }: AboutProps) {
  const t = await getTranslations({ locale, namespace: 'about' });

  const cards = [
    { icon: Award, text: t('card1') },
    { icon: Languages, text: t('card2') },
    { icon: Building2, text: t('card3') },
    { icon: HeartHandshake, text: t('card4') },
  ];

  return (
		<section className="py-16 sm:py-20 bg-[var(--color-off-white)]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Text */}
					<div>
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-6">
							{t("title")}
						</h2>
						<p className="text-[var(--color-text-muted)] leading-relaxed text-lg mb-8">
							{t("text")}
						</p>
						<div className="grid grid-cols-2 gap-4">
							{cards.map((card, i) => (
								<div
									key={i}
									className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[var(--color-border)] shadow-sm"
								>
									<div className="p-2 bg-[var(--color-primary)]/10 rounded-lg shrink-0">
										<card.icon
											size={18}
											className="text-[var(--color-primary)]"
										/>
									</div>
									<span className="text-sm font-medium text-[var(--color-text)]">
										{card.text}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Dr. Saeed Alziyadi photo with certified badge */}
					<div>
						<div className="relative">
							<div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
								<Image
									src="/ceo.jpg"
									alt="Dr. Saeed Alziyadi"
									fill
									className="object-cover"
								/>
							</div>
							{/* Floating certified badge */}
							<div className="absolute -bottom-4 -start-4 bg-white rounded-xl shadow-lg p-4 border border-[var(--color-border)] flex items-center gap-3">
								<div className="w-10 h-10 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-white">
									<Award size={20} />
								</div>
								<div>
									<div className="text-xs font-bold text-[var(--color-text)]">
										Certified
									</div>
									<div className="text-xs text-[var(--color-text-muted)]">
										Since 2017
									</div>
								</div>
							</div>
						</div>
						<div className="text-center mt-6">
							<p className="font-semibold text-lg text-[var(--color-text)]">{t("imageTitle")}</p>
							<p className="text-[var(--color-text-muted)] text-sm">{t("imageSubtitle")}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
  );
}

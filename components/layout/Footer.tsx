import Link from 'next/link';
import { Stethoscope, Phone, Mail, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface FooterProps {
  locale: string;
}

export default async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const contact = await getTranslations({ locale, namespace: 'contact' });

  return (
		<footer className="bg-[var(--color-text)] text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Logo + tagline */}
					<div className="lg:col-span-1">
						<Link href={`/${locale}`} className="flex items-center gap-2 mb-3">
							<div className="p-1.5 bg-[var(--color-accent)] rounded-lg text-white">
								<Stethoscope size={20} />
							</div>
							<span className="font-bold text-white">AlziyadiMed</span>
						</Link>
						<p className="text-sm text-gray-400 mb-4">{t("tagline")}</p>
						<div className="flex items-center gap-2 text-sm text-gray-400">
							<MapPin size={14} className="shrink-0 text-[var(--color-accent)]" />
							<span>{contact("address")}</span>
						</div>
					</div>

					{/* Navigation */}
					<div>
						<h3 className="font-semibold text-white mb-4">{nav("home")}</h3>
						<ul className="space-y-2 text-sm text-gray-400">
							<li>
								<Link
									href={`/${locale}/services`}
									className="hover:text-[var(--color-accent)] transition-colors"
								>
									{nav("services")}
								</Link>
							</li>
							<li>
								<Link
									href={`/${locale}/specialties`}
									className="hover:text-[var(--color-accent)] transition-colors"
								>
									{nav("specialties")}
								</Link>
							</li>
							<li>
								<Link
									href={`/${locale}/faq`}
									className="hover:text-[var(--color-accent)] transition-colors"
								>
									{nav("faq")}
								</Link>
							</li>
							<li>
								<Link
									href={`/${locale}/blog`}
									className="hover:text-[var(--color-accent)] transition-colors"
								>
									{nav("blog")}
								</Link>
							</li>
							<li>
								<Link
									href={`/${locale}/contact`}
									className="hover:text-[var(--color-accent)] transition-colors"
								>
									{nav("contact")}
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h3 className="font-semibold text-white mb-4">{nav("contact")}</h3>
						<ul className="space-y-3 text-sm text-gray-400">
							<li>
								<a
									href="mailto:info@alziyadimed.com"
									className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"
								>
									<Mail size={14} className="text-[var(--color-accent)]" />
									<span>info@alziyadimed.com</span>
								</a>
							</li>
							<li>
								<a
									href="https://wa.me/79252500066"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"
								>
									<Phone size={14} className="text-[var(--color-accent)]" />
									<span>🇷🇺 +7 925 250 0066</span>
								</a>
							</li>
							<li>
								<a
									href="https://wa.me/79252580005"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"
								>
									<Phone size={14} className="text-[var(--color-accent)]" />
									<span>🇷🇺 +7 925 258 0005</span>
								</a>
							</li>
						</ul>
					</div>

					{/* Language + Legal */}
					<div>
						<h3 className="font-semibold text-white mb-4">Language / اللغة / Язык</h3>
						<div className="flex flex-col gap-2 mb-6">
							<Link
								href="/ar"
								className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
							>
								<span>🇸🇦</span> العربية
							</Link>
							<Link
								href="/en"
								className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
							>
								<span>🇬🇧</span> English
							</Link>
							<Link
								href="/ru"
								className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
							>
								<span>🇷🇺</span> Русский
							</Link>
						</div>
						<ul className="space-y-2 text-sm text-gray-400">
							<li>
								<Link
									href={`/${locale}/privacy-policy`}
									className="hover:text-[var(--color-accent)] transition-colors"
								>
									{t("links.privacy")}
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
					<p>
						{t("copyright")} © {new Date().getFullYear()}
					</p>
					<p className="text-center">{t("certified")}</p>
				</div>
			</div>
		</footer>
  );
}

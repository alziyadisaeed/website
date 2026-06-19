import { Mail, MessageCircle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface ContactCTAProps {
  locale: string;
}

export default async function ContactCTA({ locale }: ContactCTAProps) {
  const t = await getTranslations({ locale, namespace: 'contact' });

  const numbers = [
		{ flag: "🇷🇺", label: t("whatsapp1"), href: "https://wa.me/79252500066" },
		{ flag: "🇷🇺", label: t("whatsapp3"), href: "https://wa.me/79252580005" },
  ];

  return (
    <section className="py-16 sm:py-20" style={{ background: 'linear-gradient(135deg, #0F1F3D 0%, #1A6DB5 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          {numbers.map((num, i) => (
            <a
              key={i}
              href={num.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg"
            >
              <MessageCircle size={20} />
              <span>{num.flag}</span>
              <span>{num.label}</span>
            </a>
          ))}
        </div>

        <a
          href={`mailto:${t('email')}`}
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
        >
          <Mail size={16} />
          <span>{t('email')}</span>
        </a>
      </div>
    </section>
  );
}

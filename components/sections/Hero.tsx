import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, ChevronRight, Shield, Users, Building2, Globe } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface HeroProps {
  locale: string;
}

export default async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: 'hero' });

  const badges = [
    { icon: Shield, text: t('badge1') },
    { icon: Users, text: t('badge2') },
    { icon: Building2, text: t('badge3') },
    { icon: Globe, text: t('badge4') },
  ];

  const delays = ['0ms', '150ms', '300ms', '450ms'];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F1F3D 0%, #1A6DB5 50%, #00C2A8 100%)',
      }}
    >
      {/* Mesh overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #3B8FD4 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #00C2A8 0%, transparent 40%),
                            radial-gradient(circle at 50% 80%, #1A6DB5 0%, transparent 40%)`,
        }}
      />

      {/* SVG Russia map overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M50 200 L150 150 L250 160 L350 120 L500 100 L700 130 L900 110 L950 160 L900 200 L800 220 L700 250 L600 230 L500 260 L400 270 L300 250 L200 270 L100 260 Z"
          fill="white"
          fillOpacity="0.3"
        />
        {/* Moscow pin */}
        <circle cx="480" cy="190" r="8" fill="#00C2A8" />
        <circle cx="480" cy="190" r="14" fill="#00C2A8" fillOpacity="0.3" />
        <text x="496" y="194" fill="white" fontSize="12" fontWeight="bold">Moscow</text>
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16 sm:py-20 lg:py-24">
          {/* Text content */}
          <div className="text-white">
            <div
              className="animate-fade-up"
              style={{ animationDelay: delays[0] }}
            >
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/30">
                🏥 Treatment in Russia
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 animate-fade-up"
              style={{ animationDelay: delays[1] }}
            >
              {t('headline')}
            </h1>

            <p
              className="text-lg text-white/80 mb-8 leading-relaxed animate-fade-up"
              style={{ animationDelay: delays[2] }}
            >
              {t('subheadline')}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-up"
              style={{ animationDelay: delays[3] }}
            >
              <a
                href="https://wa.me/79252500066"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg"
              >
                <MessageCircle size={20} />
                <span>{t('ctaPrimary')}</span>
              </a>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-colors backdrop-blur-sm"
              >
                <span>{t('ctaSecondary')}</span>
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="hidden lg:block">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src="/hero.png"
                alt="Doctor consulting with patients, Moscow skyline in the background"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="pb-10 sm:pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 animate-fade-up"
                style={{ animationDelay: `${600 + i * 100}ms` }}
              >
                <badge.icon size={20} className="text-[var(--color-accent)] shrink-0" />
                <span className="text-sm text-white font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

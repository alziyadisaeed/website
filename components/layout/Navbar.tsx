import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import NavbarMobile from './NavbarMobile';

interface NavbarProps {
  locale: string;
}

export default async function Navbar({ locale }: NavbarProps) {
  const t = await getTranslations({ locale, namespace: 'nav' });

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/specialties`, label: t('specialties') },
    { href: `/${locale}/faq`, label: t('faq') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const langSwitcher = [
    { href: '/ar', label: 'AR', flag: '🇸🇦' },
    { href: '/en', label: 'EN', flag: '🇬🇧' },
    { href: '/ru', label: 'RU', flag: '🇷🇺' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
            <div className="p-1.5 bg-[var(--color-primary)] rounded-lg text-white">
              <Stethoscope size={20} />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-[var(--color-text)] text-sm sm:text-base">
                AlziyadiMed
              </div>
              <div className="text-xs text-[var(--color-text-muted)] hidden sm:block">
                Medical Tourism Russia
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-off-white)] rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop lang switcher */}
          <div className="hidden md:flex items-center gap-1">
            {langSwitcher.map((lang) => (
              <Link
                key={lang.href}
                href={lang.href}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  locale === lang.href.slice(1)
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-[var(--color-text-muted)] hover:bg-[var(--color-off-white)]'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <div className="relative">
            <NavbarMobile links={links} langSwitcher={langSwitcher} />
          </div>
        </div>
      </div>
    </header>
  );
}

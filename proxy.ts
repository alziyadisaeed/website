import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ar', 'en', 'ru'],
  defaultLocale: 'ar',
  localeDetection: false,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};

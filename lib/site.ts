// Single canonical public origin. Deliberately NOT read from env: NEXT_PUBLIC_*
// vars are inlined at build time, so a stale value in a deploy environment would
// leak the wrong domain into canonicals, Open Graph, JSON-LD, sitemap and robots.
export const SITE_URL = 'https://alziyadimed.com';

// Retired domain. Kept only so next.config.ts can 308-redirect it to SITE_URL.
export const LEGACY_HOST_PATTERN = '(www\\.)?drsaeedalziyadi\\.com';

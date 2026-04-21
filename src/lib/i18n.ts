export const locales = ['zh', 'en'] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function withLocale(locale: Locale, path = '') {
  if (!path || path === '/') return `/${locale}`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function switchLocalePath(pathname: string, targetLocale: Locale) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = targetLocale;
    return `/${segments.join('/')}`;
  }
  return withLocale(targetLocale, pathname);
}

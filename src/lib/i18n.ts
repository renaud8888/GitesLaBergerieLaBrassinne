export const locales = ['fr', 'en', 'nl'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const localeLabels: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
  nl: 'NL',
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function stripLocaleFromPath(pathname: string) {
  return pathname.replace(/^\/(fr|en|nl)(?=\/|$)/, '') || '/';
}

export function withLocale(locale: Locale, path = '') {
  return `/${locale}${path.startsWith('/') ? path : path ? `/${path}` : ''}`;
}

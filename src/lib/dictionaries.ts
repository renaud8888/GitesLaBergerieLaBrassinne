import fr from '@/content/locales/fr/common.json';
import type { Locale } from '@/lib/i18n';

const dictionaries = {
  fr: () => import('@/content/locales/fr/common.json').then((module) => module.default),
  en: () => import('@/content/locales/en/common.json').then((module) => module.default),
  nl: () => import('@/content/locales/nl/common.json').then((module) => module.default),
};

export type SiteDictionary = typeof fr;

export async function getDictionary(locale: Locale): Promise<SiteDictionary> {
  return dictionaries[locale]();
}

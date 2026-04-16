import fr from '@/content/locales/fr/common.json';
import { extraLocaleContent } from '@/data/extra-locale-content';
import { getDictionary as getRuntimeDictionary } from '@/lib/content-store';
import type { Locale } from '@/lib/i18n';

export type SiteDictionary = typeof fr & (typeof extraLocaleContent)['fr'];

export async function getDictionary(locale: Locale): Promise<SiteDictionary> {
  return getRuntimeDictionary(locale);
}

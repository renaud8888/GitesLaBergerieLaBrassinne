import type { MetadataRoute } from 'next';

import { siteConfig } from '@/data/site';
import { locales } from '@/lib/i18n';

const pathsByLocale = {
  fr: ['', '/gites/la-bergerie', '/gites/la-brassine', '/alentours', '/guide-pratique', '/avis', '/contact'],
  en: ['', '/gites/la-bergerie', '/gites/la-brassine', '/alentours', '/guide-pratique', '/avis', '/contact'],
  nl: ['', '/gites/la-bergerie', '/gites/la-brassine', '/alentours', '/guide-pratique', '/avis', '/contact'],
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pathsByLocale[locale].map((path) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.8,
    })),
  );
}

import type { MetadataRoute } from 'next';

import { siteConfig } from '@/data/site';
import { locales } from '@/lib/i18n';

const paths = ['', '/gites/la-bergerie', '/gites/la-brassine', '/alentours', '/guide-pratique', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.8,
    })),
  );
}

import type { Metadata } from 'next';

import { siteConfig } from '@/data/site';
import type { Locale } from '@/lib/i18n';

export function createPageMetadata({
  locale,
  title,
  description,
  path,
  image,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${siteConfig.url}/${locale}${path ? `/${path}` : ''}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteConfig.url}/fr${path ? `/${path}` : ''}`,
        en: `${siteConfig.url}/en${path ? `/${path}` : ''}`,
        nl: `${siteConfig.url}/nl${path ? `/${path}` : ''}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale,
      type: 'website',
      images: [
        {
          url: image ?? `${siteConfig.url}/images/branding/og-image.svg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image ?? `${siteConfig.url}/images/branding/og-image.svg`],
    },
  };
}

import type { Metadata } from 'next';

import { GitePageTemplate } from '@/components/gites/gite-page-template';
import { getSiteImages } from '@/lib/content-store';
import { getDictionary } from '@/lib/dictionaries';
import { createPageMetadata } from '@/lib/metadata';
import { type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return createPageMetadata({
    locale,
    path: 'gites/la-brassine',
    title: dict.gites.brassine.meta.title,
    description: dict.gites.brassine.meta.description,
    image: 'https://bergerie-brassine.com/images/la-brassine/1.avif',
  });
}

export default async function BrassinePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const images = await getSiteImages();
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    name: 'La Brassine',
    url: `https://bergerie-brassine.com/${locale}/gites/la-brassine`,
    image: ['https://bergerie-brassine.com/images/la-brassine/1.avif'],
    numberOfRooms: 1,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: 2,
    },
    petsAllowed: false,
  };

  return (
    <>
      <GitePageTemplate locale={locale} dict={dict} slug="brassine" images={images} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}

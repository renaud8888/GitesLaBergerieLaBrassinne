import type { Metadata } from 'next';

import { HomePage } from '@/components/sections/home-page';
import { getDictionary } from '@/lib/dictionaries';
import { getSiteImages } from '@/lib/content-store';
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
    path: '',
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
  });
}

export default async function HomeRoute({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const images = await getSiteImages();

  return <HomePage locale={locale} dict={dict} images={images} />;
}

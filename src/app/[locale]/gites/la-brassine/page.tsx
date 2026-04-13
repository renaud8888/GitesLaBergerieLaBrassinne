import type { Metadata } from 'next';

import { GitePageTemplate } from '@/components/gites/gite-page-template';
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
  });
}

export default async function BrassinePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <GitePageTemplate locale={locale} dict={dict} slug="brassine" />;
}

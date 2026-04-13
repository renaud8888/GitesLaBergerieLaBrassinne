import { notFound } from 'next/navigation';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { WhatsappFab } from '@/components/layout/whatsapp-fab';
import { getDictionary } from '@/lib/dictionaries';
import { isLocale, locales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'La Bergerie & La Brassine',
    description: dict.meta.siteDescription,
    telephone: '+32496929355',
    email: 'claranicolay@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue du Curé 19',
      addressLocality: 'Libin',
      postalCode: '6890',
      addressCountry: 'BE',
    },
  };

  return (
    <>
      <Header locale={locale as Locale} nav={dict.nav} />
      <main>{children}</main>
      <Footer locale={locale as Locale} nav={dict.nav} footer={dict.footer} />
      <WhatsappFab />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}

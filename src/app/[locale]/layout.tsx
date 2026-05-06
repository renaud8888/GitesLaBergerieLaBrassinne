import { notFound } from 'next/navigation';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { MobileActionBar } from '@/components/layout/mobile-action-bar';
import { WhatsappFab } from '@/components/layout/whatsapp-fab';
import { getWhatsappLink } from '@/data/site';
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
    url: 'https://bergerie-brassine.com',
    telephone: '+32496929355',
    email: 'claranicolay@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue du Curé 19',
      addressLocality: 'Libin',
      postalCode: '6890',
      addressCountry: 'BE',
    },
    sameAs: [
      'https://fr.airbnb.be/rooms/1136881974542842654',
      'https://fr.airbnb.be/rooms/1194217860682227704',
    ],
  };

  return (
    <>
      <Header locale={locale as Locale} nav={dict.nav} brand={dict.ui.brand} menuAriaLabel={dict.ui.header.openMenuAria} />
      <main>{children}</main>
      <Footer locale={locale as Locale} nav={dict.nav} footer={dict.footer} brand={dict.ui.brand} ui={dict.ui.footer} />
      <MobileActionBar locale={locale as Locale} reserveLabel={dict.nav.reserve} whatsappLabel={dict.ui.footer.whatsappLabel} />
      <WhatsappFab href={getWhatsappLink(locale as Locale)} ariaLabel={dict.ui.whatsappFab.ariaLabel} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}

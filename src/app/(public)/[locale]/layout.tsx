import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import '@/app/globals.css';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { MobileActionBar } from '@/components/layout/mobile-action-bar';
import { WhatsappFab } from '@/components/layout/whatsapp-fab';
import { getWhatsappLink, siteConfig } from '@/data/site';
import { getDictionary } from '@/lib/dictionaries';
import { isLocale, locales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: '/images/branding/favicon.ico',
    shortcut: '/images/branding/favicon.ico',
    apple: '/images/branding/logo.png',
  },
};

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
    '@type': 'BedAndBreakfast',
    name: 'La Bergerie & La Brassine',
    description: dict.meta.siteDescription,
    image: ['https://bergerie-brassine.com/images/branding/og-image.png'],
    url: `https://bergerie-brassine.com/${locale}`,
    telephone: '+32496929355',
    email: 'contact@bergerie-brassine.com',
    priceRange: '€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '116',
    },
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
    <html lang={locale}>
      <body>
      <Header locale={locale as Locale} nav={dict.nav} brand={dict.ui.brand} menuAriaLabel={dict.ui.header.openMenuAria} />
      <main>{children}</main>
      <Footer locale={locale as Locale} nav={dict.nav} footer={dict.footer} brand={dict.ui.brand} ui={dict.ui.footer} />
      <MobileActionBar locale={locale as Locale} reserveLabel={dict.nav.reserve} whatsappLabel={dict.ui.footer.whatsappLabel} />
      <WhatsappFab href={getWhatsappLink(locale as Locale)} ariaLabel={dict.ui.whatsappFab.ariaLabel} />
      <CookieBanner enabled={false} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}

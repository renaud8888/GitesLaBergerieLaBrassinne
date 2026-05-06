import { NextRequest, NextResponse } from 'next/server';

import { defaultLocale, locales, type Locale } from '@/lib/i18n';

const localizedShortRoutes: Record<string, Record<Locale, string>> = {
  '/contact': {
    fr: '/fr/contact',
    en: '/en/contact',
    nl: '/nl/contact',
  },
  '/la-bergerie': {
    fr: '/fr/gites/la-bergerie',
    en: '/en/gites/la-bergerie',
    nl: '/nl/gites/la-bergerie',
  },
  '/la-brassine': {
    fr: '/fr/gites/la-brassine',
    en: '/en/gites/la-brassine',
    nl: '/nl/gites/la-brassine',
  },
  '/experiences': {
    fr: '/fr/alentours',
    en: '/en/alentours',
    nl: '/nl/alentours',
  },
  '/guide-pratique': {
    fr: '/fr/guide-pratique',
    en: '/en/guide-pratique',
    nl: '/nl/guide-pratique',
  },
};

function getPreferredLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language')?.toLowerCase() ?? '';
  const preferred = locales.find((locale) => acceptLanguage.includes(locale));

  return preferred ?? defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const preferredLocale = getPreferredLocale(request);
  const giteDestination = pathname.startsWith('/gites/') ? `/${preferredLocale}${pathname}` : undefined;
  const destination = giteDestination ?? localizedShortRoutes[pathname]?.[preferredLocale];

  if (!destination) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = destination;

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/contact', '/la-bergerie', '/la-brassine', '/experiences', '/guide-pratique', '/gites/:path*'],
};

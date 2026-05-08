'use client';

import Link from 'next/link';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

import { getWhatsappLink, siteConfig } from '@/data/site';
import type { Locale } from '@/lib/i18n';

export function Footer({
  locale,
  nav,
  footer,
  brand,
  ui,
}: {
  locale: Locale;
  nav: {
    home: string;
    bergerie: string;
    brassine: string;
    around: string;
    guide: string;
    reviews: string;
    contact: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    contactTitle: string;
    reserveTitle: string;
    reserveText: string;
    copyright: string;
  };
  brand: {
    name: string;
  };
  ui: {
    eyebrow: string;
    whatsappLabel: string;
    countryLabel: string;
  };
}) {
  const whatsappUrl = getWhatsappLink(locale);

  return (
    <footer className="mt-24 overflow-hidden bg-[linear-gradient(180deg,#4c3b33,#2b211d)] text-cream-100">
      <div className="section-shell relative py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[1.15fr_0.85fr_1fr]">
          <div className="relative">
            <p className="eyebrow-chip border-white/12 bg-white/8 text-cream-100">{ui.eyebrow}</p>
            <p className="mt-5 font-display text-4xl text-cream-50">{brand.name}</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-cream-100/78">{footer.tagline}</p>
          </div>

          <div>
            <p className="font-display text-2xl text-cream-50">{footer.quickLinks}</p>
            <div className="mt-5 grid gap-3 text-sm text-cream-100/80">
              <Link href={`/${locale}`} className="transition hover:text-cream-50">{nav.home}</Link>
              <Link href={`/${locale}/gites/la-bergerie`} className="transition hover:text-cream-50">{nav.bergerie}</Link>
              <Link href={`/${locale}/gites/la-brassine`} className="transition hover:text-cream-50">{nav.brassine}</Link>
              <Link href={`/${locale}/alentours`} className="transition hover:text-cream-50">{nav.around}</Link>
              <Link href={`/${locale}/guide-pratique`} className="transition hover:text-cream-50">{nav.guide}</Link>
              <Link href={`/${locale}/avis`} className="transition hover:text-cream-50">{nav.reviews}</Link>
              <Link href={`/${locale}/contact`} className="transition hover:text-cream-50">{nav.contact}</Link>
            </div>
          </div>

          <div>
            <p className="font-display text-2xl text-cream-50">{footer.contactTitle}</p>
            <div className="mt-5 grid gap-3 text-sm text-cream-100/80">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 transition hover:text-cream-50">
                <MessageCircle size={16} />
                <span>{ui.whatsappLabel} · {siteConfig.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-3 transition hover:text-cream-50">
                <Mail size={16} />
                {siteConfig.email}
              </a>
              <p className="inline-flex items-start gap-3">
                <MapPin size={16} className="mt-1" />
                <span>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                  <br />
                  {ui.countryLabel}
                </span>
              </p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button-whatsapp mt-2 w-fit px-4 py-2.5 text-xs">
                <MessageCircle size={16} />
                {ui.whatsappLabel}
              </a>
            </div>
          </div>

        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <div className="section-shell text-xs uppercase tracking-[0.18em] text-cream-100/60">{footer.copyright}</div>
      </div>
    </footer>
  );
}

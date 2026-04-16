import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Star } from 'lucide-react';

import { GoogleIcon } from '@/components/common/brand-icons';
import { siteConfig } from '@/data/site';
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
    googleReviewsLabel: string;
    airbnbLabel: string;
  };
}) {
  return (
    <footer className="mt-24 overflow-hidden bg-[linear-gradient(180deg,#4c3b33,#2b211d)] text-cream-100">
      <div className="section-shell relative py-12 md:py-16">
        <div className="absolute right-[-8rem] top-[-5rem] h-64 w-64 rounded-full bg-rose-200/12 blur-3xl" />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.85fr_0.95fr]">
          <div className="relative">
            <p className="eyebrow-chip border-white/12 bg-white/8 text-cream-100">{ui.eyebrow}</p>
            <p className="mt-5 font-display text-4xl text-cream-50 md:text-[3.6rem]">{brand.name}</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-cream-100/78">{footer.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-cream-100/82">
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 transition hover:text-cream-50">
                <MessageCircle size={15} />
                {nav.contact}
              </Link>
              <a href={siteConfig.whatsapp.default} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-cream-50">
                <MessageCircle size={15} />
                {ui.whatsappLabel}
              </a>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6">
            <p className="font-display text-2xl text-cream-50">{footer.quickLinks}</p>
            <div className="mt-5 grid gap-3 text-sm text-cream-100/80">
              <Link href={`/${locale}`} className="transition hover:text-cream-50">{nav.home}</Link>
              <Link href={`/${locale}/gites/la-bergerie`} className="transition hover:text-cream-50">{nav.bergerie}</Link>
              <Link href={`/${locale}/gites/la-brassine`} className="transition hover:text-cream-50">{nav.brassine}</Link>
              <Link href={`/${locale}/alentours`} className="transition hover:text-cream-50">{nav.around}</Link>
              <Link href={`/${locale}/guide-pratique`} className="transition hover:text-cream-50">{nav.guide}</Link>
              <Link href={`/${locale}/contact`} className="transition hover:text-cream-50">{nav.contact}</Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6">
              <p className="font-display text-2xl text-cream-50">{footer.contactTitle}</p>
              <div className="mt-5 grid gap-3 text-sm text-cream-100/80">
                <a href={siteConfig.whatsapp.default} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 transition hover:text-cream-50">
                  <MessageCircle size={16} />
                  {ui.whatsappLabel}
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
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-white/8 p-6">
              <p className="font-display text-2xl text-cream-50">{footer.reserveTitle}</p>
              <p className="mt-2 text-sm leading-7 text-cream-100/75">{footer.reserveText}</p>
              <div className="mt-5 grid gap-3 text-sm text-cream-100/82">
                <a href={siteConfig.googleReviews.bergerie} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/8 px-4 py-3 transition hover:bg-white/12">
                  <GoogleIcon className="h-4 w-4" />
                  {ui.googleReviewsLabel}
                </a>
                <a href={siteConfig.airbnb.bergerie} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/8 px-4 py-3 transition hover:bg-white/12">
                  <Star size={15} fill="currentColor" />
                  {ui.airbnbLabel}
                </a>
              </div>
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

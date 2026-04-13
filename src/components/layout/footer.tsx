import Link from 'next/link';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

import { ButtonLink } from '@/components/common/button-link';
import { siteConfig } from '@/data/site';
import type { Locale } from '@/lib/i18n';

export function Footer({
  locale,
  nav,
  footer,
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
}) {
  return (
    <footer className="mt-20 bg-taupe-900 text-cream-100">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.3fr_0.9fr_1fr]">
        <div>
          <p className="font-display text-3xl text-cream-50">La Bergerie & La Brassine</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-cream-100/80">{footer.tagline}</p>
        </div>

        <div>
          <p className="font-display text-2xl text-cream-50">{footer.quickLinks}</p>
          <div className="mt-4 grid gap-2 text-sm text-cream-100/80">
            <Link href={`/${locale}`}>{nav.home}</Link>
            <Link href={`/${locale}/gites/la-bergerie`}>{nav.bergerie}</Link>
            <Link href={`/${locale}/gites/la-brassine`}>{nav.brassine}</Link>
            <Link href={`/${locale}/alentours`}>{nav.around}</Link>
            <Link href={`/${locale}/guide-pratique`}>{nav.guide}</Link>
            <Link href={`/${locale}/contact`}>{nav.contact}</Link>
          </div>
        </div>

        <div>
          <p className="font-display text-2xl text-cream-50">{footer.contactTitle}</p>
          <div className="mt-4 grid gap-3 text-sm text-cream-100/80">
            <a href={siteConfig.whatsapp.default} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3">
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-3">
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
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="font-display text-2xl text-cream-50">{footer.reserveTitle}</p>
            <p className="mt-2 text-sm leading-7 text-cream-100/75">{footer.reserveText}</p>
            <ButtonLink href={`/${locale}/contact`} className="mt-4">
              {nav.contact}
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <div className="section-shell text-xs uppercase tracking-[0.18em] text-cream-100/60">{footer.copyright}</div>
      </div>
    </footer>
  );
}

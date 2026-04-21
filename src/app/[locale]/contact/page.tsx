import type { Metadata } from 'next';
import { Clock3, Mail, MapPin, ShieldCheck } from 'lucide-react';

import { WhatsAppIcon } from '@/components/common/brand-icons';
import { ButtonLink } from '@/components/common/button-link';
import { ContactForm } from '@/components/common/contact-form';
import { ImageFallback } from '@/components/common/image-fallback';
import { SectionHeading } from '@/components/common/section-heading';
import { getWhatsappLink, siteConfig } from '@/data/site';
import { getSiteImages } from '@/lib/content-store';
import { getDictionary, type SiteDictionary } from '@/lib/dictionaries';
import { createPageMetadata } from '@/lib/metadata';
import { type Locale } from '@/lib/i18n';

type PracticalCard = SiteDictionary['contact']['practicalCards'][number];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return createPageMetadata({
    locale,
    path: 'contact',
    title: dict.contact.meta.title,
    description: dict.contact.meta.description,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const contact = dict.contact;
  const images = await getSiteImages();
  const whatsappUrl = getWhatsappLink(locale);

  return (
    <>
      <section className="relative overflow-hidden bg-taupe-900 py-20 text-cream-50">
        <div className="absolute inset-0">
          <ImageFallback src={images.contact.heroImage} alt={contact.hero.title} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,34,29,0.3),rgba(45,34,29,0.86))]" />
        </div>
        <div className="section-shell relative z-10">
          <p className="eyebrow-chip border-white/16 bg-white/8 text-cream-100">{contact.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-7xl">{contact.hero.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-100/84">{contact.hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={whatsappUrl} variant="whatsapp" external icon={<WhatsAppIcon className="h-4 w-4" />}>
              {dict.ui.contact.heroWhatsappLabel}
            </ButtonLink>
            <ButtonLink href={siteConfig.airbnb.bergerie} variant="secondary" external className="border-white/16 bg-white/10 text-white">
              {dict.ui.contact.heroAirbnbLabel}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell-wide grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4">
            <article className="surface-card-strong p-6 md:p-8">
              <SectionHeading eyebrow={contact.direct.eyebrow} title={contact.direct.title} description={contact.direct.text} />
              <div className="mt-6 grid gap-3">
                <ButtonLink href={whatsappUrl} variant="whatsapp" external icon={<WhatsAppIcon className="h-4 w-4" />}>
                  {contact.direct.whatsapp}
                </ButtonLink>
                <div className="grid gap-3 md:grid-cols-2">
                  <ButtonLink href={siteConfig.airbnb.bergerie} variant="secondary" external>
                    {dict.ui.contact.directAirbnbBergerie}
                  </ButtonLink>
                  <ButtonLink href={siteConfig.airbnb.brassine} variant="secondary" external>
                    {dict.ui.contact.directAirbnbBrassine}
                  </ButtonLink>
                </div>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center rounded-[1.15rem] border border-taupe-100 bg-white/78 px-4 py-3 text-sm text-taupe-700 transition hover:bg-white">
                  {siteConfig.email}
                </a>
              </div>
            </article>

            <article className="surface-card-strong p-6 md:p-8">
              <p className="font-display text-3xl text-taupe-900">{contact.practicalTitle}</p>
              <div className="mt-5 grid gap-4">
                {contact.practicalCards.map((card: PracticalCard) => (
                  <div key={card.title} className="rounded-[1.4rem] border border-white/70 bg-white/80 p-5">
                    <p className="font-display text-2xl text-taupe-900">{card.title}</p>
                    <p className="mt-3 text-sm leading-7 text-taupe-500">{card.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <article className="surface-card-strong p-5">
                <Clock3 size={18} className="text-wood" />
                <p className="mt-3 font-display text-2xl text-taupe-900">{dict.ui.contact.quickResponseTitle}</p>
                <p className="mt-2 text-sm leading-7 text-taupe-500">{dict.ui.contact.quickResponseText}</p>
              </article>
              <article className="surface-card-strong p-5">
                <ShieldCheck size={18} className="text-wood" />
                <p className="mt-3 font-display text-2xl text-taupe-900">{dict.ui.contact.clearBookingTitle}</p>
                <p className="mt-2 text-sm leading-7 text-taupe-500">{dict.ui.contact.clearBookingText}</p>
              </article>
              <article className="surface-card-strong p-5">
                <MapPin size={18} className="text-wood" />
                <p className="mt-3 font-display text-2xl text-taupe-900">{contact.addressTitle}</p>
                <p className="mt-2 text-sm leading-7 text-taupe-500">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                  <br />
                  Belgique
                </p>
              </article>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow={contact.form.eyebrow} title={contact.form.title} description={contact.form.text} />
            <div className="mt-6">
              <ContactForm labels={contact.form.labels} ui={dict.ui.contactForm} locale={locale} />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-taupe-100 bg-white/78 p-5">
                <p className="font-display text-2xl text-taupe-900">{dict.ui.contact.responseCardTitle}</p>
                <p className="mt-3 text-sm leading-7 text-taupe-500">{dict.ui.contact.responseCardText}</p>
              </div>
              <div className="rounded-[1.5rem] border border-taupe-100 bg-white/78 p-5">
                <p className="inline-flex items-center gap-2 font-display text-2xl text-taupe-900">
                  <Mail size={16} />
                  {dict.ui.contact.inboxTitle}
                </p>
                <p className="mt-3 text-sm leading-7 text-taupe-500">{dict.ui.contact.inboxText.replace('{email}', siteConfig.email)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import { CalendarCheck, Mail, MapPin, ShieldCheck } from 'lucide-react';

import { WhatsAppIcon } from '@/components/common/brand-icons';
import { ButtonLink } from '@/components/common/button-link';
import { ContactForm } from '@/components/common/contact-form';
import { ImageFallback } from '@/components/common/image-fallback';
import { OwnerStorySection } from '@/components/common/owner-story-section';
import { SectionHeading } from '@/components/common/section-heading';
import { getWhatsappLink, siteConfig } from '@/data/site';
import { getSiteImages } from '@/lib/content-store';
import { getDictionary, type SiteDictionary } from '@/lib/dictionaries';
import { createPageMetadata } from '@/lib/metadata';
import { getBookingPath, type Locale } from '@/lib/i18n';

type PracticalCard = SiteDictionary['contact']['practicalCards'][number];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return createPageMetadata({
    locale,
    path: 'contact',
    title: dict.contact.meta.title,
    description: dict.contact.meta.description,
    image: 'https://bergerie-brassine.com/images/home/6b.avif',
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
          <h1 className="text-balance mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl md:text-7xl">{contact.hero.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-100/84">{contact.hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={getBookingPath(locale)} className="bg-[linear-gradient(135deg,#f4d8d2,#eec3be)] text-taupe-900 shadow-[0_24px_52px_rgba(240,201,198,0.38)]" icon={<CalendarCheck className="h-4 w-4" />}>
              {dict.nav.reserve}
            </ButtonLink>
            <ButtonLink href={whatsappUrl} variant="secondary" external className="border-white/16 bg-white/10 text-white" icon={<WhatsAppIcon className="h-4 w-4" />}>
              {dict.ui.contact.heroWhatsappLabel}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell-wide grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4">
            <OwnerStorySection locale={locale} compact />

            <article className="surface-card-strong overflow-hidden p-0">
              <div className="grid gap-3 p-6 md:p-8">
                <div className="rounded-[1.35rem] border border-rose-200/60 bg-white/86 p-4">
                  <p className="font-display text-3xl text-taupe-900">{dict.ui.contact.bookingPageTitle}</p>
                  <p className="mt-3 text-sm leading-7 text-taupe-500">{dict.ui.contact.bookingPageText}</p>
                  <ButtonLink href={getBookingPath(locale)} className="mt-5 w-full justify-center" icon={<CalendarCheck className="h-4 w-4" />}>
                    {dict.ui.contact.bookingPageButton}
                  </ButtonLink>
                </div>
                <div className="rounded-[1.35rem] border border-rose-200/60 bg-white/86 p-4">
                  <ButtonLink href={whatsappUrl} variant="whatsapp" external className="w-full justify-center" icon={<WhatsAppIcon className="h-4 w-4" />}>
                    {contact.direct.whatsapp}
                  </ButtonLink>
                </div>
                <div className="grid gap-3">
                  <a href="#contact-form" className="button-secondary justify-center">
                    <Mail className="h-4 w-4" />
                    <span>{dict.ui.contact.formButtonLabel}</span>
                  </a>
                </div>
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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
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
                  {dict.ui.contact.countryLabel}
                </p>
              </article>
            </div>
          </div>

          <div id="contact-form">
            <SectionHeading eyebrow={contact.form.eyebrow} title={contact.form.title} description={contact.form.text} />
            <div className="mt-6">
              <ContactForm labels={contact.form.labels} locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

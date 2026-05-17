import type { Metadata } from 'next';
import { CalendarCheck, ExternalLink, FileText, Heart, Home, MessageCircle, Sparkles } from 'lucide-react';

import { BookingForm } from '@/components/booking/booking-form';
import { WhatsAppIcon } from '@/components/common/brand-icons';
import { ButtonLink } from '@/components/common/button-link';
import { ImageFallback } from '@/components/common/image-fallback';
import { InternationalTravelInfo } from '@/components/common/international-travel-info';
import { SectionHeading } from '@/components/common/section-heading';
import { TrustSection } from '@/components/common/trust-section';
import { bookingConfig, bookingContent, getBookingWhatsappLink, type BookingTarget } from '@/data/booking';
import { formatAirbnbRating, formatAirbnbReviewCount } from '@/data/review-sources';
import { getSiteImages } from '@/lib/content-store';
import { createPageMetadata } from '@/lib/metadata';
import { getBookingPath, type Locale } from '@/lib/i18n';

export function createBookingMetadata(locale: Locale): Metadata {
  const content = bookingContent[locale];

  return createPageMetadata({
    locale,
    path: getBookingPath(locale).replace(`/${locale}/`, ''),
    title: content.meta.title,
    description: content.meta.description,
    image: 'https://bergerie-brassine.com/images/home/6b.avif',
  });
}

function GiteChoiceCard({
  locale,
  target,
  image,
}: {
  locale: Locale;
  target: Exclude<BookingTarget, 'default'>;
  image: string;
}) {
  const content = bookingContent[locale];
  const gite = content.compare[target];
  const href = target === 'bergerie' ? `/${locale}/gites/la-bergerie` : `/${locale}/gites/la-brassine`;
  const airbnbText = `${formatAirbnbRating(locale, target)} · ${formatAirbnbReviewCount(locale, target)}`;
  const rows = [
    { label: content.compare.labels.atmosphere, value: gite.atmosphere },
    { label: content.compare.labels.space, value: gite.space },
    { label: content.compare.labels.garden, value: gite.garden },
    { label: content.compare.labels.access, value: gite.access },
    { label: content.compare.labels.idealFor, value: gite.idealFor },
    { label: content.compare.labels.airbnb, value: airbnbText },
    { label: content.compare.labels.equipments, value: gite.equipments },
  ];

  return (
    <article className="surface-card-strong overflow-hidden p-0">
      <div className="relative aspect-[16/10]">
        <ImageFallback src={image} alt={gite.title} fill sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
      <div className="p-6 md:p-8">
        <p className="font-display text-4xl leading-none text-taupe-900">{gite.title}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-wood">{gite.tagline}</p>
        <p className="mt-4 text-base leading-8 text-taupe-500">{gite.text}</p>
        <div className="mt-5 grid gap-2.5">
          {rows.map((row) => (
            <div key={row.label} className="rounded-[1.15rem] border border-taupe-100 bg-white/78 px-4 py-3 text-sm leading-6">
              <p className="font-medium text-taupe-900">{row.label}</p>
              <p className="mt-1 text-taupe-500">{row.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={href} variant="secondary">
            {gite.view}
          </ButtonLink>
          <ButtonLink href={getBookingWhatsappLink(locale, target)} external icon={<WhatsAppIcon className="h-4 w-4" />}>
            {gite.reserve}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

function ComparisonSummary({ locale }: { locale: Locale }) {
  const content = bookingContent[locale];
  const labels = content.compare.labels;
  const bergerie = content.compare.bergerie;
  const brassine = content.compare.brassine;
  const rows = [
    { label: labels.atmosphere, bergerie: bergerie.atmosphere, brassine: brassine.atmosphere },
    { label: labels.space, bergerie: bergerie.space, brassine: brassine.space },
    { label: labels.garden, bergerie: bergerie.garden, brassine: brassine.garden },
    { label: labels.access, bergerie: bergerie.access, brassine: brassine.access },
    { label: labels.idealFor, bergerie: bergerie.idealFor, brassine: brassine.idealFor },
    { label: labels.airbnb, bergerie: `${formatAirbnbRating(locale, 'bergerie')} · ${formatAirbnbReviewCount(locale, 'bergerie')}`, brassine: `${formatAirbnbRating(locale, 'brassine')} · ${formatAirbnbReviewCount(locale, 'brassine')}` },
  ];

  return (
    <div className="surface-card-strong mt-6 overflow-hidden p-0">
      <div className="grid border-b border-taupe-100 bg-white/64 px-5 py-4 text-sm font-semibold text-taupe-900 md:grid-cols-[0.7fr_1fr_1fr] md:px-6">
        <span>{locale === 'fr' ? 'Critère' : locale === 'en' ? 'Criteria' : 'Criterium'}</span>
        <span className="hidden md:block">La Bergerie</span>
        <span className="hidden md:block">La Brassine</span>
      </div>
      <div className="divide-y divide-taupe-100/80">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-3 px-5 py-4 text-sm leading-6 md:grid-cols-[0.7fr_1fr_1fr] md:px-6">
            <p className="font-semibold text-taupe-900">{row.label}</p>
            <p className="text-taupe-500">
              <span className="mb-1 block font-medium text-taupe-900 md:hidden">La Bergerie</span>
              {row.bergerie}
            </p>
            <p className="text-taupe-500">
              <span className="mb-1 block font-medium text-taupe-900 md:hidden">La Brassine</span>
              {row.brassine}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function BookingPage({ locale }: { locale: Locale }) {
  const content = bookingContent[locale];
  const images = await getSiteImages();
  const whatsappUrl = getBookingWhatsappLink(locale);
  const airbnbLinks = [
    { key: 'bergerie', href: bookingConfig.airbnb.bergerie, label: content.options.airbnb.bergerie },
    { key: 'brassine', href: bookingConfig.airbnb.brassine, label: content.options.airbnb.brassine },
  ].filter((link) => link.href);

  return (
    <>
      <section className="relative overflow-hidden bg-taupe-900 py-20 text-cream-50">
        <div className="absolute inset-0">
          <ImageFallback src={images.home.heroImage} alt={content.hero.title} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,34,29,0.28),rgba(45,34,29,0.86))]" />
        </div>
        <div className="section-shell relative z-10">
          <p className="eyebrow-chip border-white/16 bg-white/8 text-cream-100">{content.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-7xl">{content.hero.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-100/84">{content.hero.description}</p>
          <div className="mt-8">
            <a href="#options-reservation" className="button-primary inline-flex">
              <CalendarCheck className="h-4 w-4" />
              <span>{content.hero.cta}</span>
            </a>
          </div>
        </div>
      </section>

      <section id="options-reservation" className="section-space scroll-mt-28">
        <div className="section-shell">
          <SectionHeading eyebrow={content.options.eyebrow} title={content.options.title} align="center" />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <article className="surface-card-strong flex flex-col p-6 md:p-8">
              <div className="inline-flex w-fit rounded-full bg-[#e4f2e6] p-3 text-[#315f3c]">
                <WhatsAppIcon className="h-5 w-5" />
              </div>
              <p className="mt-5 font-display text-3xl text-taupe-900">{content.options.whatsapp.title}</p>
              <p className="mt-4 text-sm leading-7 text-taupe-500">{content.options.whatsapp.text}</p>
              <ButtonLink href={whatsappUrl} external variant="whatsapp" className="mt-auto w-full justify-center md:w-fit" icon={<MessageCircle size={16} />}>
                {content.options.whatsapp.button}
              </ButtonLink>
            </article>

            <article className="surface-card-strong flex flex-col p-6 md:p-8">
              <div className="inline-flex w-fit rounded-full bg-rose-100 p-3 text-taupe-700">
                <FileText size={20} />
              </div>
              <p className="mt-5 font-display text-3xl text-taupe-900">{content.options.form.title}</p>
              <p className="mt-4 text-sm leading-7 text-taupe-500">{content.options.form.text}</p>
              <a href="#formulaire-reservation" className="button-primary mt-auto w-full justify-center md:w-fit">
                <span>{content.options.form.button}</span>
              </a>
            </article>

            <article className="surface-card-strong flex flex-col p-6 md:p-8">
              <div className="inline-flex w-fit rounded-full bg-cream-100 p-3 text-wood">
                <Home size={20} />
              </div>
              <p className="mt-5 font-display text-3xl text-taupe-900">{content.options.airbnb.title}</p>
              <p className="mt-4 text-sm leading-7 text-taupe-500">{content.options.airbnb.text}</p>
              <div className="mt-auto grid gap-3 pt-6">
                {airbnbLinks.map((link) => (
                  <ButtonLink key={link.key} href={link.href} external variant="secondary" className="w-full justify-center" icon={<ExternalLink size={16} />}>
                    {link.label}
                  </ButtonLink>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <InternationalTravelInfo locale={locale} />

      <TrustSection locale={locale} variant="detailed" />

      <section className="section-space pt-0">
        <div className="section-shell">
          <SectionHeading eyebrow={content.compare.eyebrow} title={content.compare.title} description={content.compare.description} align="center" />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <GiteChoiceCard locale={locale} target="bergerie" image="/images/home/2.avif" />
            <GiteChoiceCard locale={locale} target="brassine" image="/images/home/1b.avif" />
          </div>
          <ComparisonSummary locale={locale} />
        </div>
      </section>

      <section id="formulaire-reservation" className="section-space scroll-mt-28 bg-white/35">
        <div className="section-shell-wide grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading eyebrow={content.form.eyebrow} title={content.form.title} description={content.form.text} />
            <div className="mt-6 rounded-[1.6rem] border border-rose-200/60 bg-white/76 p-5 text-sm leading-7 text-taupe-600">
              <Heart size={18} className="text-wood" />
              <p className="mt-3">{content.hero.description}</p>
            </div>
          </div>
          <BookingForm labels={content.form.labels} options={content.form.options} locale={locale} />
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell">
          <div className="surface-card-strong flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <Sparkles size={20} className="text-wood" />
              <p className="mt-3 font-display text-3xl text-taupe-900 md:text-4xl">{content.contactCta.title}</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-taupe-500">{content.contactCta.text}</p>
            </div>
            <ButtonLink href={`/${locale}/contact`} variant="secondary" className="w-full justify-center md:w-fit">
              {content.contactCta.button}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import { ArrowRight, Bath, BedDouble, Quote, Star, Trees, UserRound } from 'lucide-react';

import { GoogleIcon, WhatsAppIcon } from '@/components/common/brand-icons';
import { ButtonLink } from '@/components/common/button-link';
import { ImageFallback } from '@/components/common/image-fallback';
import { SectionHeading } from '@/components/common/section-heading';
import { StackedGallery } from '@/components/common/stacked-gallery';
import { featureIcons, getWhatsappLink, giteStats, siteConfig } from '@/data/site';
import type { SiteDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n';
import type { defaultImageContent } from '@/lib/content-store';

export function HomePage({
  locale,
  dict,
  images,
}: {
  locale: Locale;
  dict: SiteDictionary;
  images: typeof defaultImageContent;
}) {
  const home = dict.home;
  const homeUi = dict.ui.home;
  const gites = [
    {
      key: 'bergerie',
      href: `/${locale}/gites/la-bergerie`,
      image: '/images/home/2.avif',
      airbnb: giteStats.bergerie.airbnbUrl,
      rating: giteStats.bergerie.reviews,
      google: giteStats.bergerie.googleUrl,
      ...home.gites.items.bergerie,
    },
    {
      key: 'brassine',
      href: `/${locale}/gites/la-brassine`,
      image: '/images/home/1b.avif',
      airbnb: giteStats.brassine.airbnbUrl,
      rating: giteStats.brassine.reviews,
      google: giteStats.brassine.googleUrl,
      ...home.gites.items.brassine,
    },
  ];
  const totalReviews = giteStats.bergerie.reviews + giteStats.brassine.reviews;
  const homeGalleryImages = home.gallery.images;
  const introTextHighlights = home.intro.highlights.filter((_, index) => index !== 0 && index !== 3);
  const introPhotoHighlights = [
    {
      key: 'stay-photo',
      title: home.intro.highlights[0]?.title,
      href: `/${locale}/gites/la-bergerie`,
      image: '/images/home/3.avif',
      alt: home.intro.highlights[0]?.title,
      cta:
        locale === 'fr'
          ? 'Découvrir les gîtes'
          : locale === 'nl'
            ? 'Ontdek de gites'
            : 'Discover the cottages',
    },
    {
      key: 'extras-photo',
      title: home.intro.highlights[3]?.title,
      href: `/${locale}/contact`,
      image: '/images/home/6b.avif',
      alt: home.intro.highlights[3]?.title,
      cta:
        locale === 'fr'
          ? 'Préparer une attention'
          : locale === 'nl'
            ? 'Bereid een attentie voor'
            : 'Plan a thoughtful extra',
    },
  ];
  const compactFacts = [
    { icon: UserRound, label: homeUi.compactFacts.guests },
    { icon: Trees, label: homeUi.compactFacts.bedroom },
    { icon: BedDouble, label: homeUi.compactFacts.bed },
    { icon: Bath, label: homeUi.compactFacts.bathroom },
  ];
  const romanticActions =
    locale === 'fr'
      ? {
          form: 'Via le formulaire',
          whatsapp: 'Via WhatsApp',
          giftVoucher: 'Demander un bon cadeau',
          champagne: 'Demander la box champagne',
        }
      : locale === 'nl'
        ? {
            form: 'Via het formulier',
            whatsapp: 'Via WhatsApp',
            giftVoucher: 'Vraag een cadeaubon aan',
            champagne: 'Vraag de champagnebox aan',
          }
        : {
            form: 'Via the form',
            whatsapp: 'Via WhatsApp',
            giftVoucher: 'Request a gift voucher',
            champagne: 'Request the champagne box',
          };

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <ImageFallback src={images.home.heroImage} alt={home.hero.imageAlt} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(53,37,30,0.28),rgba(53,37,30,0.82))]" />
        </div>
        <div className="section-shell relative z-10 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-white/30 bg-[rgba(255,250,245,0.18)] px-4 py-3 text-cream-50 shadow-[0_22px_44px_rgba(37,25,20,0.16)] backdrop-blur-md">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/35 bg-white/95 shadow-[0_8px_18px_rgba(37,25,20,0.12)]">
                <ImageFallback src={images.branding.logo} alt={`Logo ${dict.ui.brand.name}`} fill sizes="44px" />
              </div>
              <div>
                <p className="font-display text-xl text-cream-50">{dict.ui.brand.name}</p>
                <p className="text-[11px] uppercase tracking-[0.28em] text-cream-100/90">{dict.ui.brand.tagline}</p>
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-cream-100">{home.hero.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-none text-cream-50 md:text-7xl">{home.hero.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream-100 md:text-xl">{home.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/${locale}/contact`} className="bg-[linear-gradient(135deg,#f4d8d2,#eec3be)] px-6 py-4 text-taupe-900 shadow-[0_24px_52px_rgba(240,201,198,0.4)] ring-1 ring-white/35">
                {home.hero.primaryCta}
              </ButtonLink>
              <ButtonLink href={getWhatsappLink(locale)} variant="secondary" external icon={<WhatsAppIcon className="h-4 w-4" />} className="border-white/30 bg-white/14 text-cream-50 backdrop-blur-md">
                {home.hero.secondaryCta}
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-3 rounded-[2rem] border border-white/18 bg-[rgba(255,250,245,0.14)] p-4 shadow-[0_24px_60px_rgba(37,25,20,0.18)] backdrop-blur-md md:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,0.75fr))] md:p-5">
              <div className="rounded-[1.5rem] border border-white/22 bg-[linear-gradient(135deg,rgba(244,216,210,0.32),rgba(255,250,245,0.18))] p-4 text-cream-50 shadow-[0_18px_40px_rgba(37,25,20,0.14)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-cream-100/82">{homeUi.heroCard.socialProofLabel}</p>
                    <p className="mt-2 font-display text-3xl leading-none md:text-4xl">{homeUi.heroCard.socialProofValue}</p>
                  </div>
                  <span className="inline-flex rounded-full bg-white/18 p-2 text-cream-50">
                    <Star size={16} fill="currentColor" />
                  </span>
                </div>
                <p className="mt-3 text-base text-cream-100">{totalReviews} {homeUi.heroCard.socialProofReviews}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/18 bg-white/10 p-4 text-cream-50">
                <p className="text-xs uppercase tracking-[0.26em] text-cream-100/76">{homeUi.heroCard.locationLabel}</p>
                <p className="mt-2 font-display text-2xl">{homeUi.heroCard.locationValue}</p>
                <p className="mt-1 text-sm text-cream-100/88">{homeUi.heroCard.locationText}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/18 bg-white/10 p-4 text-cream-50">
                <p className="text-xs uppercase tracking-[0.26em] text-cream-100/76">{homeUi.heroCard.stayLabel}</p>
                <p className="mt-2 font-display text-2xl">{homeUi.heroCard.stayValue}</p>
                <p className="mt-1 text-sm text-cream-100/88">{homeUi.heroCard.stayText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <SectionHeading eyebrow={home.gites.eyebrow} title={home.gites.title} description={home.gites.description} align="center" />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {gites.map((gite) => (
              <article key={gite.key} className="surface-card overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <ImageFallback src={gite.image} alt={gite.name} fill sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-4xl text-taupe-900">{gite.name}</p>
                      <p className="mt-1 text-sm uppercase tracking-[0.24em] text-wood">{gite.tagline}</p>
                    </div>
                    <div className="whitespace-nowrap rounded-full bg-rose-100 px-4 py-2 text-xs uppercase tracking-[0.2em] text-taupe-700">{gite.capacity}</div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3 text-sm text-taupe-700">
                    {compactFacts.map((fact) => {
                      const Icon = fact.icon;
                      return (
                        <span key={fact.label} className="inline-flex items-center gap-2 rounded-full border border-taupe-100 bg-white/80 px-3 py-2">
                          <Icon size={14} className="text-wood" />
                          {fact.label}
                        </span>
                      );
                    })}
                  </div>
                  <p className="mt-5 text-base leading-8 text-taupe-500">{gite.description}</p>
                  <ul className="mt-5 grid gap-2 text-sm text-taupe-700">
                    {gite.bullets.map((bullet: string) => (
                      <li key={bullet} className="inline-flex items-center gap-2">
                        <Star size={14} className="text-wood" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-taupe-500">Airbnb</p>
                      <p className="font-display text-2xl text-taupe-900">5,0/5 · {gite.rating} avis</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <ButtonLink href={gite.href}>{home.gites.discover}</ButtonLink>
                      <ButtonLink href={gite.airbnb} variant="secondary" external>
                        Airbnb
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell">
          <SectionHeading eyebrow={home.gallery.eyebrow} title={home.gallery.title} description={home.gallery.description} align="center" />
          <div className="mt-10">
            <StackedGallery images={homeGalleryImages} />
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="surface-card p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-wood">{home.intro.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl text-taupe-900 md:text-5xl">{home.intro.title}</h2>
            <div className="prose-copy mt-5 text-base text-taupe-500">
              {home.intro.paragraphs.map((paragraph: string) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {introTextHighlights.map((item) => (
              <article key={item.title} className="surface-card p-6">
                <p className="font-display text-3xl text-taupe-900">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-taupe-500">{item.text}</p>
              </article>
            ))}
            {introPhotoHighlights.map((item) => (
              <Link key={item.key} href={item.href} className="group surface-card relative isolate overflow-hidden">
                <div className="relative aspect-[1.08/1]">
                  <ImageFallback src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(55,42,36,0.08),rgba(55,42,36,0.78))]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-cream-50">
                  <p className="font-display text-3xl leading-none">{item.title}</p>
                  <p className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-cream-100/88">
                    {item.cta}
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white/35">
        <div className="section-shell">
          <SectionHeading eyebrow={home.features.eyebrow} title={home.features.title} description={home.features.description} align="center" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {home.features.items.map((item) => {
              const Icon = featureIcons[item.icon as keyof typeof featureIcons];
              return (
                <article key={item.title} className="surface-card p-5">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex rounded-full bg-rose-100 p-3 text-taupe-700">
                      <Icon size={20} />
                    </div>
                    <p className="font-display text-[1.8rem] leading-none text-taupe-900">{item.title}</p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-taupe-500">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-taupe-900 px-5 py-6 text-cream-50 md:px-6 md:py-7">
            <div className="grain absolute inset-0" />
            <div className="relative z-10">
              <SectionHeading eyebrow={home.romantic.eyebrow} title={home.romantic.title} description={home.romantic.description} light />
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {home.romantic.items.map((item, index) => (
                  <div key={item.title} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                    <p className="font-display text-[2rem] leading-none">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-cream-100/78">{item.text}</p>
                    {index === 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <ButtonLink href={`/${locale}/contact`} variant="secondary" className="border-white/18 bg-white/92 px-4 py-2 text-xs text-taupe-900">
                          {romanticActions.form}
                        </ButtonLink>
                        <ButtonLink href={getWhatsappLink(locale)} variant="secondary" external className="border-white/18 bg-white/12 px-4 py-2 text-xs text-cream-50">
                          {romanticActions.whatsapp}
                        </ButtonLink>
                      </div>
                    ) : null}
                    {index === 1 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <ButtonLink href={`/${locale}/contact`} variant="secondary" className="border-white/18 bg-white/92 px-4 py-2 text-xs text-taupe-900">
                          {romanticActions.form}
                        </ButtonLink>
                        <ButtonLink href={getWhatsappLink(locale)} variant="secondary" external className="border-white/18 bg-white/12 px-4 py-2 text-xs text-cream-50">
                          {romanticActions.whatsapp}
                        </ButtonLink>
                      </div>
                    ) : null}
                    {index === 3 ? (
                      <div className="mt-4">
                        <ButtonLink href={`/${locale}/contact`} className="px-4 py-2 text-xs">
                          {romanticActions.giftVoucher}
                        </ButtonLink>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <article className="surface-card p-6">
              <p className="font-display text-4xl text-taupe-900">{home.region.title}</p>
              <p className="mt-4 text-base leading-8 text-taupe-500">{home.region.text}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={`/${locale}/alentours`} showArrow>
                  {home.region.cta}
                </ButtonLink>
                <ButtonLink href={`/${locale}/guide-pratique`} variant="secondary">
                  {home.region.guideCta}
                </ButtonLink>
              </div>
            </article>
            <article className="surface-card overflow-hidden p-0">
              <div className="relative aspect-[4/3]">
                <ImageFallback src={images.home.sideImage} alt={home.gallery.sideTitle} fill sizes="(max-width: 1024px) 100vw, 30vw" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space bg-white/35">
        <div className="section-shell">
          <SectionHeading eyebrow={home.reviews.eyebrow} title={home.reviews.title} description={home.reviews.description} align="center" />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {home.reviews.items.map((review) => {
              const isBergerie = review.gite === 'La Bergerie';
              return (
                <article key={review.author} className="surface-card p-6">
                  <Quote size={24} className="text-rose-300" />
                  <p className="mt-5 text-base leading-8 text-taupe-500">{review.text}</p>
                  <div className="mt-5 flex items-center gap-1 text-wood">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-5 font-display text-2xl text-taupe-900">{review.author}</p>
                  <p className="text-sm uppercase tracking-[0.2em] text-taupe-500">
                    {review.origin} - {review.gite}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <ButtonLink href={isBergerie ? siteConfig.googleReviews.bergerie : siteConfig.googleReviews.brassine} variant="secondary" external icon={<GoogleIcon className="h-4 w-4" />}>
                      {homeUi.reviews.googleLabel}
                    </ButtonLink>
                    <ButtonLink href={isBergerie ? siteConfig.airbnb.bergerie : siteConfig.airbnb.brassine} variant="secondary" external icon={<Star size={14} fill="currentColor" />}>
                      {homeUi.reviews.airbnbLabel}
                    </ButtonLink>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

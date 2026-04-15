import { Bath, BedDouble, Quote, Sparkles, Star, Trees, UserRound } from 'lucide-react';

import { GoogleIcon, WhatsAppIcon } from '@/components/common/brand-icons';
import { ButtonLink } from '@/components/common/button-link';
import { ImageFallback } from '@/components/common/image-fallback';
import { SectionHeading } from '@/components/common/section-heading';
import { StackedGallery } from '@/components/common/stacked-gallery';
import { featureIcons, getHomeGalleryImages, giteStats, siteConfig } from '@/data/site';
import type { SiteDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n';

export function HomePage({ locale, dict }: { locale: Locale; dict: SiteDictionary }) {
  const home = dict.home;
  const gites = [
    {
      key: 'bergerie',
      href: `/${locale}/gites/la-bergerie`,
      image: giteStats.bergerie.heroImage,
      airbnb: giteStats.bergerie.airbnbUrl,
      rating: giteStats.bergerie.reviews,
      google: giteStats.bergerie.googleUrl,
      ...home.gites.items.bergerie,
    },
    {
      key: 'brassine',
      href: `/${locale}/gites/la-brassine`,
      image: giteStats.brassine.heroImage,
      airbnb: giteStats.brassine.airbnbUrl,
      rating: giteStats.brassine.reviews,
      google: giteStats.brassine.googleUrl,
      ...home.gites.items.brassine,
    },
  ];
  const totalReviews = giteStats.bergerie.reviews + giteStats.brassine.reviews;
  const homeGalleryImages = getHomeGalleryImages(locale);
  const compactFacts = [
    { icon: UserRound, label: '2 personnes' },
    { icon: Trees, label: '1 chambre' },
    { icon: BedDouble, label: '1 lit' },
    { icon: Bath, label: '1 salle de bain' },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <ImageFallback src="/images/home/1.avif" alt={home.hero.imageAlt} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(53,37,30,0.28),rgba(53,37,30,0.82))]" />
        </div>
        <div className="section-shell relative z-10 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-white/30 bg-[rgba(255,250,245,0.18)] px-4 py-3 text-cream-50 shadow-[0_22px_44px_rgba(37,25,20,0.16)] backdrop-blur-md">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/35 bg-white/95 shadow-[0_8px_18px_rgba(37,25,20,0.12)]">
                <ImageFallback src="/images/branding/logo.png" alt="Logo La Bergerie & La Brassine" fill sizes="44px" />
              </div>
              <div>
                <p className="font-display text-xl text-cream-50">La Bergerie & La Brassine</p>
                <p className="text-[11px] uppercase tracking-[0.28em] text-cream-100/90">Gîtes de charme à Libin</p>
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-cream-100">{home.hero.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-none text-cream-50 md:text-7xl">{home.hero.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream-100 md:text-xl">{home.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/${locale}/contact`} className="bg-[linear-gradient(135deg,#f4d8d2,#eec3be)] px-6 py-4 text-taupe-900 shadow-[0_24px_52px_rgba(240,201,198,0.4)] ring-1 ring-white/35">
                {home.hero.primaryCta}
              </ButtonLink>
              <ButtonLink href={siteConfig.whatsapp.default} variant="secondary" external icon={<WhatsAppIcon className="h-4 w-4" />} className="border-white/30 bg-white/14 text-cream-50 backdrop-blur-md">
                {home.hero.secondaryCta}
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-3 rounded-[2rem] border border-white/18 bg-[rgba(255,250,245,0.14)] p-4 shadow-[0_24px_60px_rgba(37,25,20,0.18)] backdrop-blur-md md:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,0.75fr))] md:p-5">
              <div className="rounded-[1.5rem] border border-white/22 bg-[linear-gradient(135deg,rgba(244,216,210,0.32),rgba(255,250,245,0.18))] p-4 text-cream-50 shadow-[0_18px_40px_rgba(37,25,20,0.14)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-cream-100/82">Preuve sociale</p>
                    <p className="mt-2 font-display text-3xl leading-none md:text-4xl">5/5 Airbnb</p>
                  </div>
                  <span className="inline-flex rounded-full bg-white/18 p-2 text-cream-50">
                    <Star size={16} fill="currentColor" />
                  </span>
                </div>
                <p className="mt-3 text-base text-cream-100">{totalReviews} avis cumulés</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/18 bg-white/10 p-4 text-cream-50">
                <p className="text-xs uppercase tracking-[0.26em] text-cream-100/76">Lieu</p>
                <p className="mt-2 font-display text-2xl">Libin</p>
                <p className="mt-1 text-sm text-cream-100/88">Ardennes belges</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/18 bg-white/10 p-4 text-cream-50">
                <p className="text-xs uppercase tracking-[0.26em] text-cream-100/76">Séjour</p>
                <p className="mt-2 font-display text-2xl">À deux</p>
                <p className="mt-1 text-sm text-cream-100/88">Escapade romantique</p>
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
                    <div className="rounded-full bg-rose-100 px-4 py-2 text-xs uppercase tracking-[0.2em] text-taupe-700">{gite.capacity}</div>
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
            {home.intro.highlights.map((item) => (
              <article key={item.title} className="surface-card p-6">
                <p className="font-display text-3xl text-taupe-900">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-taupe-500">{item.text}</p>
              </article>
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
                <article key={item.title} className="surface-card p-6">
                  <div className="inline-flex rounded-full bg-rose-100 p-3 text-taupe-700">
                    <Icon size={20} />
                  </div>
                  <p className="mt-4 font-display text-3xl text-taupe-900">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-taupe-500">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-taupe-900 px-6 py-8 text-cream-50 md:px-8">
            <div className="grain absolute inset-0" />
            <div className="relative z-10">
              <SectionHeading eyebrow={home.romantic.eyebrow} title={home.romantic.title} description={home.romantic.description} light />
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {home.romantic.items.map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <p className="font-display text-3xl">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-cream-100/78">{item.text}</p>
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
                <ImageFallback src="/images/home/5b.avif" alt="Escapade romantique en Ardenne" fill sizes="(max-width: 1024px) 100vw, 30vw" />
              </div>
              <div className="p-6">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-wood">
                  <Sparkles size={14} />
                  {home.gallery.sideEyebrow}
                </p>
                <p className="mt-3 font-display text-4xl text-taupe-900">{home.gallery.sideTitle}</p>
                <p className="mt-3 text-base leading-8 text-taupe-500">{home.gallery.sideText}</p>
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
                      Google
                    </ButtonLink>
                    <ButtonLink href={isBergerie ? siteConfig.airbnb.bergerie : siteConfig.airbnb.brassine} variant="secondary" external icon={<Star size={14} fill="currentColor" />}>
                      Airbnb
                    </ButtonLink>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <div className="surface-card grid gap-6 overflow-hidden bg-[linear-gradient(135deg,rgba(243,223,220,0.85),rgba(255,250,245,0.92))] p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-wood">{home.finalCta.eyebrow}</p>
              <h2 className="mt-3 font-display text-4xl text-taupe-900 md:text-5xl">{home.finalCta.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-taupe-500">{home.finalCta.text}</p>
            </div>
            <div className="grid gap-3">
              <ButtonLink href={`/${locale}/contact`} className="w-full justify-between">
                {home.finalCta.contact}
              </ButtonLink>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={siteConfig.whatsapp.default} variant="secondary" external className="flex-1 justify-center" icon={<WhatsAppIcon className="h-4 w-4" />}>
                  {home.finalCta.whatsapp}
                </ButtonLink>
                <ButtonLink href={siteConfig.airbnb.bergerie} variant="secondary" external className="flex-1 justify-center">
                  Airbnb
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

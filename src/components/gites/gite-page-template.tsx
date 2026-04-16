import { BedDouble, Check, ShowerHead, Sparkles, Star, Trees } from 'lucide-react';

import { GoogleIcon, WhatsAppIcon } from '@/components/common/brand-icons';
import { ButtonLink } from '@/components/common/button-link';
import { FaqAccordion } from '@/components/common/faq-accordion';
import { Gallery } from '@/components/common/gallery';
import { ImageFallback } from '@/components/common/image-fallback';
import { SectionHeading } from '@/components/common/section-heading';
import { giteStats } from '@/data/site';
import type { SiteDictionary } from '@/lib/dictionaries';
import type { defaultImageContent } from '@/lib/content-store';
import type { Locale } from '@/lib/i18n';

export function GitePageTemplate({
  locale,
  dict,
  slug,
  images,
}: {
  locale: Locale;
  dict: SiteDictionary;
  slug: 'bergerie' | 'brassine';
  images: typeof defaultImageContent;
}) {
  const gite = dict.gites[slug];
  const stats = giteStats[slug];
  const ui = dict.ui.gites;
  const otherSlug = slug === 'bergerie' ? 'brassine' : 'bergerie';
  const otherHref = `/${locale}/gites/${otherSlug === 'bergerie' ? 'la-bergerie' : 'la-brassine'}`;
  const common = dict.gites.common;
  const galleryImages = images.gites[slug].gallery.map((src, index) => ({ src, alt: `${gite.hero.title} ${index + 1}` }));

  const quickFacts = [
    { icon: BedDouble, text: `${stats.guests} ${common.persons}` },
    { icon: Trees, text: `${stats.bedrooms} ${common.bedroom.toLowerCase()}` },
    { icon: Sparkles, text: `${stats.beds} ${common.bed.toLowerCase()}` },
    { icon: ShowerHead, text: `${stats.bathrooms} ${common.bathroom.toLowerCase()}` },
  ];

  const toneCardClass =
    slug === 'bergerie'
      ? 'bg-[linear-gradient(180deg,rgba(255,250,245,0.98),rgba(239,226,212,0.72))]'
      : 'bg-[linear-gradient(180deg,rgba(255,250,245,0.98),rgba(243,223,220,0.74))]';

  return (
    <>
      <section className="relative isolate overflow-hidden bg-taupe-900">
        <div className="absolute inset-0">
          <ImageFallback src={images.gites[slug].heroImage} alt={gite.hero.title} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,25,20,0.24),rgba(37,25,20,0.84))]" />
        </div>
        <div className="section-shell-wide relative z-10 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow-chip border-white/22 bg-white/12 text-cream-100">{gite.hero.eyebrow}</p>
            <h1 className="mt-5 font-display text-6xl text-cream-50 md:text-[5.5rem]">{gite.hero.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-100 md:text-xl">{gite.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/${locale}/contact`} className="bg-[linear-gradient(135deg,#f4d8d2,#eec3be)] text-taupe-900 shadow-[0_24px_52px_rgba(240,201,198,0.38)]">
                {ui.common.reserveLabel}
              </ButtonLink>
              <ButtonLink href={stats.whatsappUrl} variant="secondary" external className="border-white/18 bg-white/14 text-white" icon={<WhatsAppIcon className="h-4 w-4" />}>
                {common.bookWhatsapp}
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 rounded-[1.8rem] border border-white/16 bg-[rgba(255,250,245,0.14)] p-5 shadow-[0_22px_48px_rgba(37,25,20,0.16)] backdrop-blur md:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-cream-50/94">
                {quickFacts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <span key={fact.text} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2">
                      <Icon size={16} className="text-cream-100/82" />
                      {fact.text}
                    </span>
                  );
                })}
              </div>
              <div className="grid gap-3 sm:grid-cols-[auto_auto] xl:min-w-[360px]">
                <div className="rounded-[1.35rem] border border-white/14 bg-[linear-gradient(135deg,rgba(244,216,210,0.32),rgba(255,250,245,0.12))] px-4 py-3 text-cream-50">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cream-100/78">{ui.common.travelerReviewsLabel}</p>
                  <p className="mt-2 inline-flex items-center gap-2 font-display text-3xl">
                    <Star size={16} fill="currentColor" className="text-cream-50" />
                    5/5 Airbnb
                  </p>
                  <p className="mt-1 text-sm text-cream-100/86">{stats.reviews} {common.reviews}</p>
                </div>
                <a href={stats.googleUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-[1.35rem] border border-white/14 bg-white/10 px-4 py-3 text-sm text-cream-50 transition hover:bg-white/16">
                  <GoogleIcon className="h-4 w-4" />
                  {ui.common.googleReviewsLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell-wide">
          <SectionHeading eyebrow={common.galleryEyebrow} title={common.galleryTitle} description={gite.galleryIntro} />
          <div className="mt-8">
            <Gallery images={galleryImages} previewCount={9} />
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell-wide grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className={`surface-card-strong p-6 md:p-8 ${toneCardClass}`}>
            <p className="text-xs uppercase tracking-[0.24em] text-wood">{ui.common.firstImpressionsEyebrow}</p>
            <p className="mt-3 font-display text-4xl text-taupe-900">
              {ui[slug].firstImpressionsTitle}
            </p>
            <div className="editorial-divider mt-6" />
            <p className="mt-6 text-base leading-8 text-taupe-600">{gite.outdoor.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={`/${locale}/contact`}>{ui.common.reserveLabel}</ButtonLink>
              <ButtonLink href={stats.airbnbUrl} variant="secondary" external>
                {ui.common.airbnbLabel}
              </ButtonLink>
            </div>
          </div>

          <div className="surface-card-strong p-6 md:p-8">
            <SectionHeading eyebrow={gite.story.eyebrow} title={gite.story.title} description={gite.story.lead} />
            <div className="prose-copy mt-6 text-base text-taupe-500">
              {gite.story.paragraphs.map((paragraph: string) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell-wide">
          <SectionHeading eyebrow={common.highlights} title={common.highlights} description={ui[slug].highlightsDescription} />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {gite.highlights.map((item: string) => (
              <article key={item} className="surface-card-strong p-5">
                <div className="inline-flex rounded-full bg-rose-100 p-2.5 text-taupe-700">
                  <Check size={16} />
                </div>
                <p className="mt-4 text-base leading-7 text-taupe-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space section-tint">
        <div className="section-shell-wide grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="surface-card-strong p-6 md:p-8">
            <p className="font-display text-3xl text-taupe-900">{dict.equipment.title}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {dict.equipment.categories.map((category) => (
                <div key={category.title} className="rounded-[1.4rem] border border-white/70 bg-white/84 p-4">
                  <p className="font-display text-[1.75rem] leading-none text-taupe-900">{category.title}</p>
                  <ul className="mt-4 grid gap-2 text-sm leading-6 text-taupe-500">
                    {category.items.map((item: string) => (
                      <li key={item} className="inline-flex gap-2 rounded-[1rem] bg-cream-50/70 px-3 py-2">
                        <span className="mt-[0.5rem] h-1.5 w-1.5 rounded-full bg-rose-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card-strong p-6 md:p-8">
            <p className="font-display text-3xl text-taupe-900">{common.stayInfo}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {gite.stayInfo.map((item) => (
                <article key={item.title} className="rounded-[1.4rem] border border-white/70 bg-white/80 p-4">
                  <p className="font-display text-[1.7rem] leading-none text-taupe-900">{item.title}</p>
                  <p className="mt-3 text-sm leading-6 text-taupe-500">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell-wide grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="surface-card-strong p-6 md:p-8">
            <p className="font-display text-3xl text-taupe-900">{common.guestLove}</p>
            <div className="mt-5 rounded-[1.5rem] border border-white/70 bg-white/80 p-5">
              <div className="flex items-center gap-1 text-wood">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-base leading-8 text-taupe-500">{gite.reviewHighlight.text}</p>
              <p className="mt-4 font-display text-2xl text-taupe-900">{gite.reviewHighlight.author}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={stats.googleUrl} variant="secondary" external icon={<GoogleIcon className="h-4 w-4" />}>
                  {ui.common.googleLabel}
                </ButtonLink>
                <ButtonLink href={stats.airbnbUrl} variant="secondary" external icon={<Star size={14} fill="currentColor" />}>
                  {ui.common.airbnbLabel}
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className={`surface-card-strong p-6 md:p-8 ${toneCardClass}`}>
            <p className="font-display text-3xl text-taupe-900">{gite.outdoor.title}</p>
            <p className="mt-4 text-base leading-8 text-taupe-600">{gite.outdoor.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={`/${locale}/contact`} className="bg-[linear-gradient(135deg,#f4d8d2,#eec3be)] text-taupe-900">
                {ui.common.reserveLabel}
              </ButtonLink>
              <ButtonLink href={stats.whatsappUrl} variant="secondary" external icon={<WhatsAppIcon className="h-4 w-4" />}>
                {ui.common.whatsappLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell-wide grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading eyebrow={common.faqEyebrow} title={common.faqTitle} description={gite.faqIntro} />
            <div className="mt-8">
              <FaqAccordion items={gite.faq} />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="surface-card-strong p-6 md:p-8">
              <p className="font-display text-3xl text-taupe-900">{common.otherGite}</p>
              <p className="mt-4 text-base leading-8 text-taupe-500">{dict.gites[otherSlug].hero.description}</p>
              <ButtonLink href={otherHref} className="mt-6">
                {dict.gites[otherSlug].hero.title}
              </ButtonLink>
            </div>
            <div className="surface-card-strong p-6 md:p-8">
              <p className="font-display text-3xl text-taupe-900">{ui.common.bookingCardTitle}</p>
              <p className="mt-3 text-base leading-8 text-taupe-500">{ui.common.bookingCardText}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={`/${locale}/contact`}>{ui.common.reserveLabel}</ButtonLink>
                <ButtonLink href={stats.airbnbUrl} variant="secondary" external>
                  {ui.common.airbnbLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

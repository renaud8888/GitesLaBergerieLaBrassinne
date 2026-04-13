import { Check, MapPin, Star } from 'lucide-react';

import { ButtonLink } from '@/components/common/button-link';
import { FaqAccordion } from '@/components/common/faq-accordion';
import { Gallery } from '@/components/common/gallery';
import { ImageFallback } from '@/components/common/image-fallback';
import { SectionHeading } from '@/components/common/section-heading';
import { giteStats } from '@/data/site';
import type { SiteDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n';

export function GitePageTemplate({
  locale,
  dict,
  slug,
}: {
  locale: Locale;
  dict: SiteDictionary;
  slug: 'bergerie' | 'brassine';
}) {
  const gite = dict.gites[slug];
  const stats = giteStats[slug];
  const otherSlug = slug === 'bergerie' ? 'brassine' : 'bergerie';
  const otherHref = `/${locale}/gites/${otherSlug === 'bergerie' ? 'la-bergerie' : 'la-brassine'}`;
  const common = dict.gites.common;
  const images = stats.gallery.map((src, index) => ({ src, alt: `${gite.hero.title} ${index + 1}` }));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-taupe-900">
        <div className="absolute inset-0">
          <ImageFallback src={stats.heroImage} alt={gite.hero.title} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,25,20,0.2),rgba(37,25,20,0.8))]" />
        </div>
        <div className="section-shell relative z-10 py-18 md:py-24">
          <p className="text-xs uppercase tracking-[0.35em] text-cream-100/85">{gite.hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl text-cream-50 md:text-7xl">{gite.hero.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-cream-100/85">{gite.hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={stats.whatsappUrl} variant="whatsapp" external>
              {common.bookWhatsapp}
            </ButtonLink>
            <ButtonLink href={stats.airbnbUrl} variant="secondary" external className="border-white/20 bg-white/10 text-white">
              {common.bookAirbnb}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow={gite.story.eyebrow} title={gite.story.title} description={gite.story.lead} />
            <div className="prose-copy mt-6 text-base text-taupe-500">
              {gite.story.paragraphs.map((paragraph: string) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="surface-card p-6 md:p-8">
            <p className="font-display text-3xl text-taupe-900">{common.practicalSheet}</p>
            <div className="mt-5 grid gap-4 text-sm text-taupe-600">
              <div className="flex items-center justify-between rounded-[1.2rem] bg-white px-4 py-3">
                <span>{common.capacity}</span>
                <strong>{stats.guests} {common.persons}</strong>
              </div>
              <div className="flex items-center justify-between rounded-[1.2rem] bg-white px-4 py-3">
                <span>{common.bedroom}</span>
                <strong>{stats.bedrooms}</strong>
              </div>
              <div className="flex items-center justify-between rounded-[1.2rem] bg-white px-4 py-3">
                <span>{common.bed}</span>
                <strong>{stats.beds}</strong>
              </div>
              <div className="flex items-center justify-between rounded-[1.2rem] bg-white px-4 py-3">
                <span>{common.bathroom}</span>
                <strong>{stats.bathrooms}</strong>
              </div>
              <div className="rounded-[1.2rem] bg-rose-100 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-taupe-500">Airbnb</p>
                <p className="mt-2 font-display text-3xl text-taupe-900">5,0/5</p>
                <p className="mt-1 text-sm text-taupe-600">{stats.reviews} {common.reviews}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell">
          <SectionHeading eyebrow={common.galleryEyebrow} title={common.galleryTitle} description={gite.galleryIntro} />
          <div className="mt-8">
            <Gallery images={images} />
          </div>
        </div>
      </section>

      <section className="section-space bg-white/35">
        <div className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-card p-6 md:p-8">
            <p className="font-display text-3xl text-taupe-900">{common.highlights}</p>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-taupe-600">
              {gite.highlights.map((item: string) => (
                <li key={item} className="inline-flex items-start gap-3">
                  <Check size={18} className="mt-1 text-wood" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-card p-6 md:p-8">
            <p className="font-display text-3xl text-taupe-900">{dict.equipment.title}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {dict.equipment.categories.map((category) => (
                <div key={category.title} className="rounded-[1.4rem] bg-white p-5">
                  <p className="font-display text-2xl text-taupe-900">{category.title}</p>
                  <ul className="mt-4 grid gap-2 text-sm leading-7 text-taupe-500">
                    {category.items.map((item: string) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-card p-6 md:p-8">
            <p className="font-display text-3xl text-taupe-900">{common.stayInfo}</p>
            <div className="mt-6 grid gap-4 text-sm text-taupe-600">
              {gite.stayInfo.map((item) => (
                <div key={item.title} className="rounded-[1.3rem] bg-white p-5">
                  <p className="font-display text-2xl text-taupe-900">{item.title}</p>
                  <p className="mt-2 leading-7">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="surface-card p-6 md:p-8">
            <p className="font-display text-3xl text-taupe-900">{common.guestLove}</p>
            <div className="mt-5 rounded-[1.5rem] bg-white p-5">
              <div className="flex items-center gap-1 text-wood">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-base leading-8 text-taupe-500">{gite.reviewHighlight.text}</p>
              <p className="mt-4 font-display text-2xl text-taupe-900">{gite.reviewHighlight.author}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={stats.airbnbUrl} external>
                  {common.bookAirbnb}
                </ButtonLink>
                <ButtonLink href={stats.googleUrl} variant="secondary" external>
                  Google
                </ButtonLink>
              </div>
            </div>
            <div className="mt-5 rounded-[1.5rem] bg-rose-100 p-5">
              <p className="inline-flex items-center gap-3 font-display text-2xl text-taupe-900">
                <MapPin size={20} />
                {gite.outdoor.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-taupe-600">{gite.outdoor.text}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-white/35">
        <div className="section-shell grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading eyebrow={common.faqEyebrow} title={common.faqTitle} description={gite.faqIntro} />
            <div className="mt-8">
              <FaqAccordion items={gite.faq} />
            </div>
          </div>
          <div className="surface-card p-6 md:p-8">
            <p className="font-display text-3xl text-taupe-900">{common.otherGite}</p>
            <p className="mt-4 text-base leading-8 text-taupe-500">{dict.gites[otherSlug].hero.description}</p>
            <ButtonLink href={otherHref} className="mt-6">
              {dict.gites[otherSlug].hero.title}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

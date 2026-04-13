import { BedDouble, Check, MapPin, MessageCircle, ShowerHead, Sparkles, Star, Trees } from 'lucide-react';

import { GoogleIcon, WhatsAppIcon } from '@/components/common/brand-icons';
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

  const quickFacts = [
    { icon: BedDouble, label: common.capacity, value: `${stats.guests} ${common.persons}` },
    { icon: Trees, label: common.bedroom, value: `${stats.bedrooms}` },
    { icon: Sparkles, label: common.bed, value: `${stats.beds}` },
    { icon: ShowerHead, label: common.bathroom, value: `${stats.bathrooms}` },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-taupe-900">
        <div className="absolute inset-0">
          <ImageFallback src={stats.heroImage} alt={gite.hero.title} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,25,20,0.12),rgba(37,25,20,0.82))]" />
        </div>
        <div className="section-shell-wide relative z-10 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow-chip border-white/16 bg-white/8 text-cream-100">{gite.hero.eyebrow}</p>
            <h1 className="mt-5 font-display text-6xl text-cream-50 md:text-[5.5rem]">{gite.hero.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-100/86 md:text-xl">{gite.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={stats.whatsappUrl} variant="whatsapp" external icon={<WhatsAppIcon className="h-4 w-4" />}>
                {common.bookWhatsapp}
              </ButtonLink>
              <ButtonLink href={stats.airbnbUrl} variant="secondary" external className="border-white/18 bg-white/12 text-white">
                {common.bookAirbnb}
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-4 md:grid-cols-4">
              {quickFacts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div key={fact.label} className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5 backdrop-blur">
                    <Icon size={18} className="text-cream-100/80" />
                    <p className="mt-4 text-xs uppercase tracking-[0.22em] text-cream-100/62">{fact.label}</p>
                    <p className="mt-2 font-display text-3xl text-cream-50">{fact.value}</p>
                  </div>
                );
              })}
            </div>
            <div className="rounded-[1.8rem] border border-white/12 bg-white/8 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-cream-100/62">Airbnb</p>
              <div className="mt-3 flex items-center gap-2 text-cream-50">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 font-display text-4xl text-cream-50">5,0/5</p>
              <p className="mt-1 text-sm text-cream-100/78">{stats.reviews} {common.reviews}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href={stats.googleUrl} variant="secondary" external className="border-white/18 bg-white/12 text-white" icon={<GoogleIcon className="h-4 w-4" />}>
                  Google
                </ButtonLink>
                <ButtonLink href={stats.airbnbUrl} variant="secondary" external className="border-white/18 bg-white/12 text-white" icon={<Star size={14} fill="currentColor" />}>
                  Airbnb
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell-wide grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-card-strong p-6 md:p-8">
            <SectionHeading eyebrow={gite.story.eyebrow} title={gite.story.title} description={gite.story.lead} />
            <div className="prose-copy mt-6 text-base text-taupe-500">
              {gite.story.paragraphs.map((paragraph: string) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className={slug === 'bergerie' ? 'surface-card-strong bg-[linear-gradient(180deg,rgba(255,250,245,0.96),rgba(239,226,212,0.72))] p-6 md:p-8' : 'surface-card-strong bg-[linear-gradient(180deg,rgba(255,250,245,0.96),rgba(243,223,220,0.74))] p-6 md:p-8'}>
              <p className="font-display text-3xl text-taupe-900">{common.practicalSheet}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {quickFacts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div key={fact.label} className="rounded-[1.35rem] border border-white/60 bg-white/72 p-4">
                      <div className="inline-flex rounded-full bg-rose-100 p-2 text-taupe-700">
                        <Icon size={16} />
                      </div>
                      <p className="mt-4 text-xs uppercase tracking-[0.22em] text-taupe-500">{fact.label}</p>
                      <p className="mt-2 font-display text-3xl text-taupe-900">{fact.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="surface-card-strong p-6 md:p-8">
              <p className="font-display text-3xl text-taupe-900">{common.highlights}</p>
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-taupe-600">
                {gite.highlights.map((item: string) => (
                  <li key={item} className="inline-flex items-start gap-3 rounded-[1.15rem] border border-taupe-100 bg-white/78 px-4 py-3">
                    <Check size={18} className="mt-1 text-wood" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell-wide">
          <SectionHeading eyebrow={common.galleryEyebrow} title={common.galleryTitle} description={gite.galleryIntro} />
          <div className="mt-8">
            <Gallery images={images} previewCount={12} />
          </div>
        </div>
      </section>

      <section className="section-space section-tint">
        <div className="section-shell-wide grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="surface-card-strong p-6 md:p-8">
            <p className="font-display text-3xl text-taupe-900">{dict.equipment.title}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {dict.equipment.categories.map((category) => (
                <div key={category.title} className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5">
                  <p className="font-display text-2xl text-taupe-900">{category.title}</p>
                  <ul className="mt-4 grid gap-2 text-sm leading-7 text-taupe-500">
                    {category.items.map((item: string) => (
                      <li key={item} className="inline-flex gap-2">
                        <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-rose-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="surface-card-strong p-6 md:p-8">
              <p className="font-display text-3xl text-taupe-900">{common.stayInfo}</p>
              <div className="mt-6 grid gap-4">
                {gite.stayInfo.map((item) => (
                  <article key={item.title} className="rounded-[1.45rem] border border-white/70 bg-white/80 p-5">
                    <p className="font-display text-2xl text-taupe-900">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-taupe-500">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>

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
                  <ButtonLink href={stats.whatsappUrl} variant="whatsapp" external icon={<WhatsAppIcon className="h-4 w-4" />}>
                    {common.bookWhatsapp}
                  </ButtonLink>
                  <ButtonLink href={stats.googleUrl} variant="secondary" external icon={<GoogleIcon className="h-4 w-4" />}>
                    Google
                  </ButtonLink>
                </div>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-rose-200/40 bg-rose-100/88 p-5">
                <p className="inline-flex items-center gap-3 font-display text-2xl text-taupe-900">
                  <MapPin size={20} />
                  {gite.outdoor.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-taupe-600">{gite.outdoor.text}</p>
              </div>
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
              <p className="font-display text-3xl text-taupe-900">Réserver simplement</p>
              <p className="mt-3 text-base leading-8 text-taupe-500">Réservation directe via WhatsApp, contact facile et liens Airbnb toujours accessibles pour rassurer sans détourner du direct.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={stats.whatsappUrl} variant="whatsapp" external icon={<WhatsAppIcon className="h-4 w-4" />}>
                  WhatsApp
                </ButtonLink>
                <ButtonLink href={stats.airbnbUrl} variant="secondary" external icon={<MessageCircle size={14} />}>
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

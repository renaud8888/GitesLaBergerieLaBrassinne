import { BedDouble, Check, ShowerHead, Sparkles, Star, Trees } from 'lucide-react';

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
          <ImageFallback src={stats.heroImage} alt={gite.hero.title} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,25,20,0.18),rgba(37,25,20,0.82))]" />
        </div>
        <div className="section-shell-wide relative z-10 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow-chip border-white/16 bg-white/8 text-cream-100">{gite.hero.eyebrow}</p>
            <h1 className="mt-5 font-display text-6xl text-cream-50 md:text-[5.5rem]">{gite.hero.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-100/88 md:text-xl">{gite.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/${locale}/contact`}>Réserver</ButtonLink>
              <ButtonLink href={stats.whatsappUrl} variant="secondary" external className="border-white/18 bg-white/12 text-white" icon={<WhatsAppIcon className="h-4 w-4" />}>
                {common.bookWhatsapp}
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 rounded-[1.8rem] border border-white/14 bg-white/10 p-5 backdrop-blur md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-cream-50/92">
                {quickFacts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <span key={fact.text} className="inline-flex items-center gap-2">
                      <Icon size={16} className="text-cream-100/82" />
                      {fact.text}
                    </span>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-cream-100/82">
                <span className="inline-flex items-center gap-2">
                  <Star size={14} fill="currentColor" className="text-cream-50" />
                  5,0/5 Airbnb
                </span>
                <span>{stats.reviews} {common.reviews}</span>
                <a href={stats.googleUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-cream-50 transition hover:text-cream-100">
                  <GoogleIcon className="h-4 w-4" />
                  Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell-wide grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-card-strong p-6 md:p-8">
            <SectionHeading eyebrow={gite.story.eyebrow} title={gite.story.title} description={gite.story.lead} />
            <div className="prose-copy mt-6 text-base text-taupe-500">
              {gite.story.paragraphs.map((paragraph: string) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className={`surface-card-strong p-6 md:p-8 ${toneCardClass}`}>
            <p className="text-xs uppercase tracking-[0.24em] text-wood">En résumé</p>
            <p className="mt-3 font-display text-4xl text-taupe-900">
              {slug === 'bergerie' ? 'Plus d’espace, plus de lumière, toujours la même douceur.' : 'Plus intime, plus enveloppante, pensée comme un cocon.'}
            </p>
            <div className="editorial-divider mt-6" />
            <p className="mt-6 text-base leading-8 text-taupe-600">{gite.outdoor.text}</p>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell-wide">
          <SectionHeading eyebrow={common.galleryEyebrow} title={common.galleryTitle} description={gite.galleryIntro} />
          <div className="mt-8">
            <Gallery images={images} previewCount={9} />
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell-wide">
          <SectionHeading eyebrow={common.highlights} title={common.highlights} description={slug === 'bergerie' ? 'Une adresse pensée pour les couples qui aiment l’espace, la lumière et les détails soignés.' : 'Un cocon plus compact, plus intime, très agréable pour ralentir et se retrouver à deux.'} />
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
                <div key={category.title} className="rounded-[1.5rem] border border-white/70 bg-white/84 p-5">
                  <p className="font-display text-2xl text-taupe-900">{category.title}</p>
                  <ul className="mt-4 grid gap-2.5 text-sm leading-7 text-taupe-500">
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
                  Google
                </ButtonLink>
                <ButtonLink href={stats.airbnbUrl} variant="secondary" external icon={<Star size={14} fill="currentColor" />}>
                  Airbnb
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className={`surface-card-strong p-6 md:p-8 ${toneCardClass}`}>
            <p className="font-display text-3xl text-taupe-900">{gite.outdoor.title}</p>
            <p className="mt-4 text-base leading-8 text-taupe-600">{gite.outdoor.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={`/${locale}/contact`}>Réserver</ButtonLink>
              <ButtonLink href={stats.whatsappUrl} variant="secondary" external icon={<WhatsAppIcon className="h-4 w-4" />}>
                WhatsApp
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
              <p className="font-display text-3xl text-taupe-900">Réserver simplement</p>
              <p className="mt-3 text-base leading-8 text-taupe-500">Un contact direct quand vous le souhaitez, avec les liens Airbnb visibles pour rassurer sans surcharger le parcours.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={`/${locale}/contact`}>Réserver</ButtonLink>
                <ButtonLink href={stats.airbnbUrl} variant="secondary" external>
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

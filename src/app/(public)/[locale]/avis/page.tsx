import type { Metadata } from 'next';
import { MessageSquareHeart, Star } from 'lucide-react';

import { ButtonLink } from '@/components/common/button-link';
import { ImageFallback } from '@/components/common/image-fallback';
import { siteConfig } from '@/data/site';
import { getSiteImages } from '@/lib/content-store';
import { getDictionary } from '@/lib/dictionaries';
import { type Locale } from '@/lib/i18n';
import { createPageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return createPageMetadata({
    locale,
    path: 'avis',
    title: dict.reviewsPage.meta.title,
    description: dict.reviewsPage.meta.description,
    image: 'https://bergerie-brassine.com/images/home/2.avif',
  });
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const images = await getSiteImages();
  const reviews = dict.reviewsPage;
  const cards = [
    {
      key: 'bergerie',
      image: images.gites.bergerie.heroImage,
      href: siteConfig.googleReviewRequests.bergerie,
      ...reviews.cards.bergerie,
    },
    {
      key: 'brassine',
      image: images.gites.brassine.heroImage,
      href: siteConfig.googleReviewRequests.brassine,
      ...reviews.cards.brassine,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-taupe-900 py-20 text-cream-50 md:py-24">
        <div className="absolute inset-0">
          <ImageFallback src="/images/home/3b.avif" alt={reviews.hero.title} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,34,29,0.22),rgba(45,34,29,0.88))]" />
        </div>
        <div className="section-shell relative z-10">
          <p className="eyebrow-chip border-white/16 bg-white/8 text-cream-100">{reviews.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-none md:text-7xl">{reviews.hero.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-100/84">{reviews.hero.description}</p>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-6">
          {cards.map((card) => (
            <article key={card.key} className="surface-card-strong overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[260px] lg:min-h-[420px]">
                  <ImageFallback src={card.image} alt={card.name} fill sizes="(max-width: 1024px) 100vw, 48vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(55,42,36,0.02),rgba(55,42,36,0.38))]" />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
                  <div className="flex items-center gap-2 text-wood">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} size={18} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="mt-6 font-display text-5xl leading-none text-taupe-900 md:text-6xl">{card.name}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.24em] text-wood">{card.tagline}</p>
                  <p className="mt-5 max-w-xl text-base leading-8 text-taupe-500">{card.text}</p>
                  <div className="mt-8">
                    <ButtonLink href={card.href} external className="w-full justify-center px-6 py-4 text-base md:w-fit" icon={<MessageSquareHeart className="h-5 w-5" />}>
                      {reviews.buttonLabel}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="rounded-[1.5rem] border border-rose-200/70 bg-white/70 px-5 py-4 text-center text-sm leading-7 text-taupe-500 shadow-[0_18px_38px_rgba(89,63,49,0.06)]">
            {reviews.footerNote}
          </div>
        </div>
      </section>
    </>
  );
}

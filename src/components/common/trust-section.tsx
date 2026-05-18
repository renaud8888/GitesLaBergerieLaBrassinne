import { CarFront, CookingPot, Heart, MessageCircle, ShieldCheck, Sparkles, Star, Wifi } from 'lucide-react';

import { ButtonLink } from '@/components/common/button-link';
import {
  formatAirbnbRating,
  formatAirbnbReviewCount,
  getAirbnbReviewCta,
  reviewLabels,
  reviewSources,
} from '@/data/review-sources';
import { trustContent, type TrustGite } from '@/data/trust';
import { getBookingPath, type Locale } from '@/lib/i18n';

type TrustSectionProps = {
  locale: Locale;
  variant?: 'compact' | 'standard' | 'detailed';
  gite?: TrustGite;
};

const proofIconMap = {
  parking: CarFront,
  wifi: Wifi,
  linen: ShieldCheck,
  bedReady: Sparkles,
  kitchen: CookingPot,
  whatsapp: MessageCircle,
  airbnb: Star,
  couples: Heart,
  handmade: Sparkles,
} as const;

const compactProofs = ['wifi', 'parking', 'linen', 'kitchen'] as const;
const standardProofs = ['parking', 'wifi', 'linen', 'bedReady', 'kitchen', 'handmade', 'whatsapp'] as const;
const comfortProofs = ['parking', 'wifi', 'linen', 'bedReady', 'kitchen'] as const;
const bookingProofs = ['whatsapp', 'airbnb'] as const;
const coupleProofs = ['couples'] as const;

function ProofBadges({ locale, keys }: { locale: Locale; keys: readonly (keyof typeof proofIconMap)[] }) {
  const content = trustContent[locale];

  return (
    <div className="flex flex-wrap gap-2">
      {keys.map((key) => {
        const Icon = proofIconMap[key];

        return (
          <span key={key} className="inline-flex items-center gap-2 rounded-full border border-taupe-100 bg-white/78 px-3 py-2 text-sm text-taupe-700">
            <Icon size={15} className="text-wood" aria-hidden="true" />
            {content.proofs[key]}
          </span>
        );
      })}
    </div>
  );
}

function AirbnbMiniCard({ locale, gite }: { locale: Locale; gite: TrustGite }) {
  const title = gite === 'bergerie' ? 'La Bergerie' : 'La Brassinne';

  return (
    <div className="rounded-[1.25rem] border border-white/70 bg-white/82 p-4">
      <p className="font-display text-2xl leading-none text-taupe-900">{title}</p>
      <p className="mt-2 text-sm font-semibold text-taupe-800">{formatAirbnbRating(locale, gite)}</p>
      <p className="mt-1 text-sm text-taupe-500">{formatAirbnbReviewCount(locale, gite)}</p>
    </div>
  );
}

export function TrustSection({ locale, variant = 'standard', gite }: TrustSectionProps) {
  const content = trustContent[locale];

  if (variant === 'compact' && gite) {
    const airbnbUrl = reviewSources.airbnb[gite].url;
    const googleUrl = reviewSources.google[`${gite}Url`];

    return (
      <section className="section-space pt-0">
        <div className="section-shell-wide">
          <div className="surface-card-strong grid gap-5 p-5 md:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-wood">{content.compactTitle}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-taupe-900">
                  <Star size={15} fill="currentColor" aria-hidden="true" />
                  {formatAirbnbRating(locale, gite)} · {formatAirbnbReviewCount(locale, gite)}
                </span>
                <ProofBadges locale={locale} keys={compactProofs} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {airbnbUrl ? (
                <ButtonLink href={airbnbUrl} external variant="secondary" className="w-full justify-center md:w-fit">
                  {getAirbnbReviewCta(locale, gite)}
                </ButtonLink>
              ) : null}
              {googleUrl ? (
                <ButtonLink href={googleUrl} external variant="secondary" className="w-full justify-center md:w-fit">
                  {reviewLabels[locale].googleCta}
                </ButtonLink>
              ) : null}
              <ButtonLink href={getBookingPath(locale)} className="w-full justify-center md:w-fit">
                {content.book}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'detailed') {
    const cards = [
      {
        title: content.cards.reviews.title,
        text: content.cards.reviews.text,
        icon: Star,
        children: (
          <>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <AirbnbMiniCard locale={locale} gite="bergerie" />
              <AirbnbMiniCard locale={locale} gite="brassine" />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {reviewSources.airbnb.bergerie.url ? (
                <ButtonLink href={reviewSources.airbnb.bergerie.url} external variant="secondary" className="w-full justify-center md:w-fit">
                  {getAirbnbReviewCta(locale, 'bergerie')}
                </ButtonLink>
              ) : null}
              {reviewSources.airbnb.brassine.url ? (
                <ButtonLink href={reviewSources.airbnb.brassine.url} external variant="secondary" className="w-full justify-center md:w-fit">
                  {getAirbnbReviewCta(locale, 'brassine')}
                </ButtonLink>
              ) : null}
              {reviewSources.google.globalUrl ? (
                <ButtonLink href={reviewSources.google.globalUrl} external variant="secondary" className="w-full justify-center md:w-fit">
                  {reviewLabels[locale].googleCta}
                </ButtonLink>
              ) : null}
            </div>
          </>
        ),
      },
      {
        title: content.cards.comfort.title,
        text: content.cards.comfort.text,
        icon: ShieldCheck,
        children: <div className="mt-5"><ProofBadges locale={locale} keys={comfortProofs} /></div>,
      },
      {
        title: content.cards.booking.title,
        text: content.cards.booking.text,
        icon: MessageCircle,
        children: <div className="mt-5"><ProofBadges locale={locale} keys={bookingProofs} /></div>,
      },
      {
        title: content.cards.couples.title,
        text: content.cards.couples.text,
        icon: Heart,
        children: <div className="mt-5"><ProofBadges locale={locale} keys={coupleProofs} /></div>,
      },
    ];

    return (
      <section className="section-space section-tint-soft">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-wood">{content.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl leading-none text-taupe-900 md:text-5xl">{content.bookingTitle}</h2>
            <p className="mt-5 text-base leading-8 text-taupe-500">{content.bookingText}</p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <article key={card.title} className="surface-card-strong p-6">
                  <div className="inline-flex rounded-full bg-rose-100 p-3 text-taupe-700">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-3xl leading-none text-taupe-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-taupe-500">{card.text}</p>
                  {card.children}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-space bg-white/35">
      <div className="section-shell">
        <div className="surface-card-strong grid gap-6 p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-wood">{content.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl leading-none text-taupe-900 md:text-5xl">{content.homeTitle}</h2>
            <p className="mt-5 text-base leading-8 text-taupe-500">{content.homeText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={`/${locale}#gites`} variant="secondary">
                {content.seeGites}
              </ButtonLink>
              <ButtonLink href={getBookingPath(locale)}>{content.book}</ButtonLink>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <AirbnbMiniCard locale={locale} gite="bergerie" />
              <AirbnbMiniCard locale={locale} gite="brassine" />
            </div>
            <ProofBadges locale={locale} keys={standardProofs} />
            <div className="flex flex-wrap gap-2">
              {reviewSources.airbnb.bergerie.url ? (
                <ButtonLink href={reviewSources.airbnb.bergerie.url} external variant="secondary" className="w-full justify-center md:w-fit">
                  {getAirbnbReviewCta(locale, 'bergerie')}
                </ButtonLink>
              ) : null}
              {reviewSources.airbnb.brassine.url ? (
                <ButtonLink href={reviewSources.airbnb.brassine.url} external variant="secondary" className="w-full justify-center md:w-fit">
                  {getAirbnbReviewCta(locale, 'brassine')}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

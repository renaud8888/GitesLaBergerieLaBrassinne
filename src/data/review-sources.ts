import { giteStats, siteConfig } from '@/data/site';
import type { Locale } from '@/lib/i18n';

export type ReviewGite = 'bergerie' | 'brassine';

export const reviewSources = {
  airbnb: {
    bergerie: {
      label: 'Airbnb La Bergerie',
      rating: giteStats.bergerie.rating,
      reviewCount: giteStats.bergerie.reviews,
      url: giteStats.bergerie.airbnbUrl,
    },
    brassine: {
      label: 'Airbnb La Brassinne',
      rating: giteStats.brassine.rating,
      reviewCount: giteStats.brassine.reviews,
      url: giteStats.brassine.airbnbUrl,
    },
  },
  google: {
    label: 'Google',
    globalUrl: siteConfig.mapsUrl,
    bergerieUrl: siteConfig.googleReviews.bergerie,
    brassineUrl: siteConfig.googleReviews.brassine,
  },
} as const;

export const reviewLabels = {
  fr: {
    airbnbBergerieCta: 'Voir les avis Airbnb La Bergerie',
    airbnbBrassineCta: 'Voir les avis Airbnb La Brassinne',
    googleCta: 'Voir sur Google',
    googleMapsDirectionsCta: "Ouvrir l'itinéraire Google Maps",
    airbnbBergerieRating: '5/5 sur Airbnb · La Bergerie',
    airbnbBrassineRating: '5/5 sur Airbnb · La Brassinne',
    reviews: 'avis',
  },
  en: {
    airbnbBergerieCta: 'See La Bergerie reviews on Airbnb',
    airbnbBrassineCta: 'See La Brassinne reviews on Airbnb',
    googleCta: 'See on Google',
    googleMapsDirectionsCta: 'Open Google Maps directions',
    airbnbBergerieRating: '5/5 on Airbnb · La Bergerie',
    airbnbBrassineRating: '5/5 on Airbnb · La Brassinne',
    reviews: 'reviews',
  },
  nl: {
    airbnbBergerieCta: 'Bekijk de Airbnb-beoordelingen van La Bergerie',
    airbnbBrassineCta: 'Bekijk de Airbnb-beoordelingen van La Brassinne',
    googleCta: 'Bekijk op Google',
    googleMapsDirectionsCta: 'Route openen in Google Maps',
    airbnbBergerieRating: '5/5 op Airbnb · La Bergerie',
    airbnbBrassineRating: '5/5 op Airbnb · La Brassinne',
    reviews: 'beoordelingen',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export function getAirbnbReviewCta(locale: Locale, gite: ReviewGite) {
  return gite === 'bergerie'
    ? reviewLabels[locale].airbnbBergerieCta
    : reviewLabels[locale].airbnbBrassineCta;
}

export function formatAirbnbRating(locale: Locale, gite: ReviewGite) {
  return gite === 'bergerie'
    ? reviewLabels[locale].airbnbBergerieRating
    : reviewLabels[locale].airbnbBrassineRating;
}

export function formatAirbnbReviewCount(locale: Locale, gite: ReviewGite) {
  return `${reviewSources.airbnb[gite].reviewCount} ${reviewLabels[locale].reviews}`;
}

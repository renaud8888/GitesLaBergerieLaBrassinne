import { Clock, ExternalLink, Footprints, MapPin, Phone, Route, Sparkles, Utensils, type LucideIcon } from 'lucide-react';
import { ImageFallback } from '@/components/common/image-fallback';
import {
  getFallbackMapsUrl,
  type AroundRecommendation,
  type RecommendationCategory,
} from '@/data/around-recommendations';
import { type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type RecommendationCardItem = {
  name: string;
  image?: string;
  location?: string;
  distance?: string;
  description: string;
  tags?: string[];
};

type RecommendationCardProps = {
  item: RecommendationCardItem;
  sectionKey: string;
  imageSrc: string;
  recommendation?: AroundRecommendation;
  locale: Locale;
};

const labels = {
  fr: {
    distance: 'Depuis le gîte',
    location: 'Lieu',
    cuisine: 'Cuisine',
    budget: 'Budget',
    duration: 'Durée',
    walkDistance: 'Distance',
    difficulty: 'Niveau',
    activityType: 'Type',
    weather: 'Météo',
    routeType: 'Parcours',
    website: 'Voir le site',
    maps: "Ouvrir l'itinéraire Google Maps",
    mapsWalk: "Ouvrir l'itinéraire Google Maps",
    call: 'Appeler',
    websiteAria: 'Ouvrir le site de',
    mapsAria: "Ouvrir l'itinéraire Google Maps vers",
    callAria: 'Appeler',
    weatherTagLabels: {
      'beau-temps': 'beau temps',
      pluie: 'pluie',
      indoor: 'indoor',
      outdoor: 'outdoor',
    },
  },
  en: {
    distance: 'From the cottage',
    location: 'Place',
    cuisine: 'Cuisine',
    budget: 'Budget',
    duration: 'Duration',
    walkDistance: 'Distance',
    difficulty: 'Level',
    activityType: 'Type',
    weather: 'Weather',
    routeType: 'Route',
    website: 'Website',
    maps: 'Open Google Maps directions',
    mapsWalk: 'Open Google Maps directions',
    call: 'Call',
    websiteAria: 'Open the website for',
    mapsAria: 'Open Google Maps directions to',
    callAria: 'Call',
    weatherTagLabels: {
      'beau-temps': 'good weather',
      pluie: 'rain',
      indoor: 'indoor',
      outdoor: 'outdoor',
    },
  },
  nl: {
    distance: 'Vanaf de gîte',
    location: 'Plaats',
    cuisine: 'Keuken',
    budget: 'Budget',
    duration: 'Duur',
    walkDistance: 'Afstand',
    difficulty: 'Niveau',
    activityType: 'Type',
    weather: 'Weer',
    routeType: 'Route',
    website: 'Website',
    maps: 'Route openen in Google Maps',
    mapsWalk: 'Route openen in Google Maps',
    call: 'Bellen',
    websiteAria: 'Open de website van',
    mapsAria: 'Open Google Maps-route naar',
    callAria: 'Bel',
    weatherTagLabels: {
      'beau-temps': 'mooi weer',
      pluie: 'regen',
      indoor: 'indoor',
      outdoor: 'outdoor',
    },
  },
} satisfies Record<Locale, Record<string, string | Record<string, string>>>;

const categoryBySection: Record<string, RecommendationCategory> = {
  restaurants: 'restaurant',
  walks: 'walk',
  activities: 'activity',
  rainy: 'activity',
  villages: 'village',
  cycling: 'bike',
};

function displayCategory(sectionKey: string, recommendation?: AroundRecommendation): RecommendationCategory {
  return recommendation?.category ?? categoryBySection[sectionKey] ?? 'activity';
}

function metaRows(item: RecommendationCardItem, recommendation: AroundRecommendation | undefined, locale: Locale, sectionKey: string) {
  const t = labels[locale];
  const category = displayCategory(sectionKey, recommendation);
  const location = recommendation?.locationLabel ?? item.location;
  const distance = recommendation?.distanceFromGite ?? item.distance;
  const weather = recommendation?.weatherTags
    ?.map((tag) => t.weatherTagLabels[tag])
    .join(', ');
  const rows: { label: string; value?: string; icon: LucideIcon }[] = [];

  if (location) rows.push({ label: t.location, value: location, icon: MapPin });
  if (distance) rows.push({ label: t.distance, value: distance, icon: Clock });

  if (category === 'restaurant') {
    rows.push({ label: t.cuisine, value: recommendation?.cuisineType, icon: Utensils });
    rows.push({ label: t.budget, value: recommendation?.priceRange, icon: Sparkles });
  }

  if (category === 'walk') {
    rows.push({ label: t.duration, value: recommendation?.duration, icon: Clock });
    rows.push({ label: t.walkDistance, value: recommendation?.walkDistance, icon: Footprints });
    rows.push({ label: t.difficulty, value: recommendation?.difficulty, icon: Route });
  }

  if (category === 'activity') {
    rows.push({ label: t.activityType, value: recommendation?.activityType, icon: Sparkles });
    rows.push({ label: t.weather, value: weather, icon: Clock });
    rows.push({ label: t.duration, value: recommendation?.duration, icon: Clock });
  }

  if (category === 'bike') {
    rows.push({ label: t.routeType, value: recommendation?.routeType, icon: Route });
    rows.push({ label: t.duration, value: recommendation?.duration, icon: Clock });
    rows.push({ label: t.walkDistance, value: recommendation?.routeDistance, icon: Footprints });
    rows.push({ label: t.difficulty, value: recommendation?.difficulty, icon: Route });
  }

  return rows.filter((row) => row.value);
}

function actionLinks(item: RecommendationCardItem, recommendation: AroundRecommendation | undefined, locale: Locale, sectionKey: string) {
  const t = labels[locale];
  const category = displayCategory(sectionKey, recommendation);
  const mapsUrl = recommendation?.mapsUrl ?? (item.location ? getFallbackMapsUrl(item.name, item.location) : undefined);
  const phoneHref = recommendation?.phone?.startsWith('tel:') ? recommendation.phone : recommendation?.phone ? `tel:${recommendation.phone}` : undefined;
  const mapsLabel = category === 'walk' ? t.mapsWalk : t.maps;
  const actions = [
    recommendation?.websiteUrl
      ? {
          key: 'website',
          href: recommendation.websiteUrl,
          label: t.website,
          ariaLabel: `${t.websiteAria} ${item.name}`,
          icon: ExternalLink,
          external: true,
          primary: category !== 'restaurant',
        }
      : undefined,
    mapsUrl
      ? {
          key: 'maps',
          href: mapsUrl,
          label: mapsLabel,
          ariaLabel: `${t.mapsAria} ${item.name}`,
          icon: MapPin,
          external: true,
          primary: category === 'restaurant' || !recommendation?.websiteUrl,
        }
      : undefined,
    phoneHref
      ? {
          key: 'phone',
          href: phoneHref,
          label: t.call,
          ariaLabel: `${t.callAria} ${item.name}`,
          icon: Phone,
          external: false,
          primary: false,
        }
      : undefined,
  ].filter(Boolean);

  return actions as {
    key: string;
    href: string;
    label: string;
    ariaLabel: string;
    icon: LucideIcon;
    external: boolean;
    primary: boolean;
  }[];
}

export function RecommendationCard({ item, sectionKey, imageSrc, recommendation, locale }: RecommendationCardProps) {
  const rows = metaRows(item, recommendation, locale, sectionKey);
  const actions = actionLinks(item, recommendation, locale, sectionKey);
  const category = displayCategory(sectionKey, recommendation);
  const showDescription = category !== 'restaurant';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-taupe-100 bg-white shadow-[0_18px_38px_rgba(89,63,49,0.06)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-100">
        <ImageFallback src={imageSrc} alt={item.name} fill sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div>
          <p className="font-display text-[2rem] leading-none text-taupe-900">{item.name}</p>
          {rows.length ? (
            <div className="mt-4 grid gap-2">
              {rows.map(({ label, value, icon: Icon }) => (
                <div key={`${label}-${value}`} className="flex items-start gap-2.5 text-sm leading-6 text-taupe-700">
                  <Icon size={16} className="mt-1 shrink-0 text-wood" aria-hidden="true" />
                  <span>
                    <span className="font-medium text-taupe-900">{label}</span>
                    <span className="text-taupe-500"> · {value}</span>
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {showDescription ? <p className="mt-4 text-sm leading-7 text-taupe-500">{item.description}</p> : null}

        {item.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag: string) => (
              <span key={tag} className="rounded-full bg-cream-100 px-3 py-1 text-xs uppercase tracking-[0.15em] text-taupe-500">
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {actions.length ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {actions.map(({ key, href, label, ariaLabel, icon: Icon, external, primary }) => (
              <a
                key={key}
                href={href}
                aria-label={ariaLabel}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className={cn(
                  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-rose-200 focus:ring-offset-2',
                  primary
                    ? 'bg-[linear-gradient(135deg,#f4d8d2,#eec3be)] text-taupe-900 shadow-[0_14px_28px_rgba(240,201,198,0.34)] hover:translate-y-[-1px]'
                    : 'border border-taupe-200 bg-white text-taupe-700 hover:border-rose-200 hover:bg-cream-50',
                )}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

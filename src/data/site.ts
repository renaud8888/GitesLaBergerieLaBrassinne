import { BedDouble, CarFront, CookingPot, Gift, Heart, Leaf, MessageCircle, MonitorPlay, Sparkles, Tv, UtensilsCrossed, Wifi } from 'lucide-react';

import type { Locale } from '@/lib/i18n';
import { formatWhatsappLink } from '@/lib/utils';

export const siteConfig = {
  name: 'La Bergerie & La Brassine – Gîtes de charme à Libin',
  shortName: 'La Bergerie & La Brassine',
  url: 'https://bergerie-brassine.com',
  phone: '+32496929355',
  email: 'claranicolay@gmail.com',
  address: {
    street: 'Rue du Curé 19',
    postalCode: '6890',
    city: 'Libin',
    country: 'Belgique',
  },
  airbnb: {
    bergerie:
      'https://fr.airbnb.be/rooms/1136881974542842654?guests=1&adults=1&s=67&unique_share_id=6968bcf8-f783-485b-9f90-1c4b6d1cd75a',
    brassine:
      'https://fr.airbnb.be/rooms/1194217860682227704?guests=1&adults=1&s=67&unique_share_id=83e27977-d1f6-4fb6-886a-a7b0d271c288',
  },
  googleReviews: {
    bergerie:
      'https://www.google.com/maps/place/Gite+La+Bergerie/@49.9786837,5.2599893,17z/data=!3m1!4b1!4m6!3m5!1s0x47c02b05f4fb4c69:0x1ed918e834c2ba39!8m2!3d49.9786837!4d5.2599893!16s%2Fg%2F11q4hf8j1c?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D',
    brassine:
      'https://www.google.com/maps/place/Gite+La+Brassinne/@49.9785957,5.2596728,17z/data=!3m1!4b1!4m6!3m5!1s0x47c02b720e0a7291:0x4716f2598b1e71ce!8m2!3d49.9785957!4d5.2596728!16s%2Fg%2F11q4hdygts?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D',
  },
  whatsapp: {
    default: formatWhatsappLink('+32496929355', 'Bonjour, je souhaite des informations pour un séjour à Libin.'),
    bergerie: formatWhatsappLink('+32496929355', 'Bonjour, je souhaite réserver La Bergerie.'),
    brassine: formatWhatsappLink('+32496929355', 'Bonjour, je souhaite réserver La Brassine.'),
  },
  checkIn: '16:00 - 23:00',
  checkOut: '10:00',
  coordinates: {
    lat: 49.9786837,
    lng: 5.2599893,
  },
} as const;

function createNumberedGallery(folder: 'la-bergerie' | 'la-brassine', count: number) {
  return Array.from({ length: count }, (_, index) => `/images/${folder}/${index + 1}.avif`);
}

const homeGalleryFrames = [
  {
    src: '/images/home/1.avif',
    alt: {
      fr: 'La Bergerie et la Brassine, une arrivée romantique à Libin',
      en: 'La Bergerie and La Brassine, a romantic arrival in Libin',
      nl: 'La Bergerie en La Brassine, een romantische aankomst in Libin',
    },
  },
  {
    src: '/images/home/2.avif',
    alt: {
      fr: 'La Bergerie, la lumière et les matières naturelles',
      en: 'La Bergerie, light and natural textures',
      nl: 'La Bergerie, licht en natuurlijke materialen',
    },
  },
  {
    src: '/images/home/2b.avif',
    alt: {
      fr: 'La Brassine, plus intime et enveloppante',
      en: 'La Brassine, more intimate and cocooning',
      nl: 'La Brassine, intiemer en omhullend',
    },
  },
  {
    src: '/images/home/3.avif',
    alt: {
      fr: 'Une table dressée pour un séjour à deux',
      en: 'A table set for a stay for two',
      nl: 'Een gedekte tafel voor een verblijf met twee',
    },
  },
  {
    src: '/images/home/3b.avif',
    alt: {
      fr: 'Des détails shabby chic pleins de douceur',
      en: 'Soft shabby chic details',
      nl: 'Zachte shabby chic details',
    },
  },
  {
    src: '/images/home/4.avif',
    alt: {
      fr: 'Une atmosphère chic et chaleureuse',
      en: 'A chic and warm atmosphere',
      nl: 'Een chique en warme sfeer',
    },
  },
  {
    src: '/images/home/4b.avif',
    alt: {
      fr: "Le charme d'un séjour romantique dans les Ardennes",
      en: 'The charm of a romantic stay in the Ardennes',
      nl: 'De charme van een romantisch verblijf in de Ardennen',
    },
  },
  {
    src: '/images/home/5.avif',
    alt: {
      fr: 'Une parenthèse élégante pour ralentir',
      en: 'An elegant escape to slow down',
      nl: 'Een elegante pauze om te vertragen',
    },
  },
  {
    src: '/images/home/5b.avif',
    alt: {
      fr: 'Escapade romantique en Ardenne',
      en: 'A romantic Ardennes getaway',
      nl: 'Een romantisch uitje in de Ardennen',
    },
  },
  {
    src: '/images/home/6.avif',
    alt: {
      fr: 'Une ambiance feutrée et raffinée',
      en: 'A refined, softly lit ambience',
      nl: 'Een verfijnde, zacht verlichte sfeer',
    },
  },
  {
    src: '/images/home/6b.avif',
    alt: {
      fr: 'Des instants précieux à partager à deux',
      en: 'Precious moments to share together',
      nl: 'Kostbare momenten om samen te delen',
    },
  },
] satisfies Array<{ src: string; alt: Record<Locale, string> }>;

const giteGalleryConfig = {
  bergerie: {
    heroImage: '/images/la-bergerie/1.avif',
    gallery: createNumberedGallery('la-bergerie', 45),
  },
  brassine: {
    heroImage: '/images/la-brassine/1.avif',
    gallery: createNumberedGallery('la-brassine', 31),
  },
} as const;

export const giteStats = {
  bergerie: {
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    rating: 5,
    reviews: 53,
    airbnbUrl: siteConfig.airbnb.bergerie,
    googleUrl: siteConfig.googleReviews.bergerie,
    whatsappUrl: siteConfig.whatsapp.bergerie,
    heroImage: giteGalleryConfig.bergerie.heroImage,
    gallery: giteGalleryConfig.bergerie.gallery,
  },
  brassine: {
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    rating: 5,
    reviews: 63,
    airbnbUrl: siteConfig.airbnb.brassine,
    googleUrl: siteConfig.googleReviews.brassine,
    whatsappUrl: siteConfig.whatsapp.brassine,
    heroImage: giteGalleryConfig.brassine.heroImage,
    gallery: giteGalleryConfig.brassine.gallery,
  },
} as const;

export function getHomeGalleryImages(locale: Locale) {
  return homeGalleryFrames.map((image) => ({
    src: image.src,
    alt: image.alt[locale],
  }));
}

export const featureIcons = {
  bed: BedDouble,
  utensils: CookingPot,
  wifi: Wifi,
  tv: Tv,
  car: CarFront,
  heart: Heart,
  wine: UtensilsCrossed,
  flower: Leaf,
  sparkles: Sparkles,
  gift: Gift,
  message: MessageCircle,
  monitor: MonitorPlay,
} as const;

export const aroundSectionImages = {
  restaurants: '/images/around/redu1.jpeg',
  walks: '/images/around/foret.webp',
  romantic: '/images/around/mirwart1.jpg',
  activities: '/images/around/lesse1.jpg',
  rainy: '/images/around/default.jpg',
  villages: '/images/around/redu.jpg',
  cycling: '/images/around/velo.jpg',
} as const;

export function getBaseUrlForLocale(locale: Locale) {
  return `${siteConfig.url}/${locale}`;
}

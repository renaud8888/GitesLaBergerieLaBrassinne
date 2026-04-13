import { BedDouble, CarFront, CookingPot, Gift, Heart, Leaf, MessageCircle, MonitorPlay, Sparkles, Tv, UtensilsCrossed, Wifi } from 'lucide-react';

import type { Locale } from '@/lib/i18n';
import { formatWhatsappLink } from '@/lib/utils';

export const siteConfig = {
  name: 'La Bergerie & La Brassine – Gîtes de charme à Libin',
  shortName: 'La Bergerie & La Brassine',
  url: 'https://gites-libin.vercel.app',
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
    heroImage: '/images/la-bergerie/1.avif',
    gallery: [
      '/images/la-bergerie/1.avif',
      '/images/la-bergerie/2.avif',
      '/images/la-bergerie/3.avif',
      '/images/la-bergerie/4.avif',
      '/images/la-bergerie/5.avif',
      '/images/la-bergerie/6.avif',
      '/images/la-bergerie/7.avif',
      '/images/la-bergerie/8.avif',
    ],
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
    heroImage: '/images/la-brassine/1.avif',
    gallery: [
      '/images/la-brassine/1.avif',
      '/images/la-brassine/2.avif',
      '/images/la-brassine/3.avif',
      '/images/la-brassine/4.avif',
      '/images/la-brassine/5.avif',
      '/images/la-brassine/6.avif',
      '/images/la-brassine/7.avif',
      '/images/la-brassine/8.avif',
    ],
  },
} as const;

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

export function getBaseUrlForLocale(locale: Locale) {
  return `${siteConfig.url}/${locale}`;
}

import type { Locale } from '@/lib/i18n';

export const dualGiteContent = {
  fr: {
    title: 'Venir à deux couples ou entre amis',
    text: 'La Bergerie et La Brassinne sont situées l’une à côté de l’autre, tout en restant totalement indépendantes. Vous pouvez donc louer les deux gîtes pour venir avec des amis, partager le séjour, tout en gardant l’intimité de chaque logement.',
  },
  en: {
    title: 'Coming with friends?',
    text: 'La Bergerie and La Brassinne are located next to each other while remaining fully independent. You can book both gites to stay close to your friends while keeping the privacy of each accommodation.',
  },
  nl: {
    title: 'Samen met vrienden komen?',
    text: 'La Bergerie en La Brassinne liggen naast elkaar, maar blijven volledig onafhankelijk. U kunt beide gîtes huren om samen met vrienden te verblijven, met behoud van de privacy van elke accommodatie.',
  },
} as const satisfies Record<Locale, { title: string; text: string }>;

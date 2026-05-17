import { getBookingPath, type Locale } from '@/lib/i18n';

export type StayIdea = {
  id: string;
  title: string;
  description: string;
  ideas: string[];
  ctas: { label: string; href: string }[];
};

const aroundPath = (locale: Locale) => `/${locale}/alentours`;

export const stayIdeasContent = {
  fr: {
    eyebrow: 'Inspirations',
    title: 'Des idées de séjours prêts à vivre',
    description:
      'Vous ne connaissez pas encore la région ? Voici quelques inspirations simples pour profiter pleinement de votre parenthèse dans les Ardennes.',
  },
  en: {
    eyebrow: 'Inspiration',
    title: 'Ready-made stay ideas',
    description:
      'Not familiar with the region yet? Here are a few simple ideas to make the most of your Ardennes getaway.',
  },
  nl: {
    eyebrow: 'Inspiratie',
    title: 'Ideeën voor een zorgeloos verblijf',
    description:
      'Kent u de streek nog niet? Deze eenvoudige ideeën helpen u om volop van uw pauze in de Ardennen te genieten.',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export function getStayIdeas(locale: Locale): StayIdea[] {
  const around = aroundPath(locale);
  const booking = getBookingPath(locale);

  const content = {
    fr: [
      {
        id: 'romantic-weekend',
        title: 'Week-end romantique',
        description: 'Un séjour doux, pensé pour se retrouver à deux et profiter du calme des Ardennes.',
        ideas: [
          'Dîner dans un restaurant recommandé',
          'Balade douce à Redu ou autour de Libin',
          'Soirée au calme dans le gîte',
          'Matinée tranquille avant le départ',
        ],
        ctas: [
          { label: 'Voir les restaurants', href: `${around}#restaurants` },
          { label: 'Voir les promenades', href: `${around}#promenades` },
        ],
      },
      {
        id: 'nature-weekend',
        title: 'Week-end nature',
        description: 'Forêts, villages et grands espaces pour ralentir et respirer.',
        ideas: [
          'Promenade autour de Libin',
          'Découverte du Domaine de Mirwart',
          'Balade en forêt de Saint-Hubert',
          'Pause dans un village ardennais',
        ],
        ctas: [
          { label: 'Voir les promenades', href: `${around}#promenades` },
          { label: 'Explorer les alentours', href: around },
        ],
      },
      {
        id: 'rainy-cocooning-weekend',
        title: 'Week-end pluie & cocooning',
        description: 'Même sous la pluie, la région offre de belles idées pour profiter sans courir.',
        ideas: [
          'Visite de l’Euro Space Center',
          'Moment bien-être ou spa',
          'Bowling ou activité indoor',
          'Soirée cocooning au gîte',
        ],
        ctas: [
          { label: 'Voir les activités pluie', href: `${around}#pluie` },
          { label: 'Réserver', href: booking },
        ],
      },
      {
        id: 'ardenne-discovery-weekend',
        title: 'Week-end découverte des Ardennes',
        description: 'Un aperçu simple des lieux emblématiques à découvrir autour de Libin.',
        ideas: [
          'Visite de Redu, village du livre',
          'Escapade à Bouillon',
          'Découverte de Mirwart',
          'Promenade ou restaurant de terroir',
        ],
        ctas: [
          { label: 'Explorer les alentours', href: around },
          { label: 'Voir les villages', href: `${around}#villages-patrimoine` },
        ],
      },
    ],
    en: [
      {
        id: 'romantic-weekend',
        title: 'Romantic weekend',
        description: 'A gentle stay designed to reconnect as a couple and enjoy the calm of the Ardennes.',
        ideas: [
          'Dinner at a recommended restaurant',
          'A soft walk in Redu or around Libin',
          'A quiet evening in the gite',
          'A slow morning before departure',
        ],
        ctas: [
          { label: 'See restaurants', href: `${around}#restaurants` },
          { label: 'See walks', href: `${around}#promenades` },
        ],
      },
      {
        id: 'nature-weekend',
        title: 'Nature weekend',
        description: 'Forests, villages and open spaces to slow down and breathe.',
        ideas: [
          'A walk around Libin',
          'Discover the Domaine de Mirwart',
          'A forest walk near Saint-Hubert',
          'A pause in an Ardennes village',
        ],
        ctas: [
          { label: 'See walks', href: `${around}#promenades` },
          { label: 'Explore the surroundings', href: around },
        ],
      },
      {
        id: 'rainy-cocooning-weekend',
        title: 'Rainy & cosy weekend',
        description: 'Even when it rains, the region has lovely ideas for enjoying your stay without rushing.',
        ideas: [
          'Visit the Euro Space Center',
          'A wellness or spa moment',
          'Bowling or an indoor activity',
          'A cosy evening in the gite',
        ],
        ctas: [
          { label: 'See rainy-day activities', href: `${around}#pluie` },
          { label: 'Book', href: booking },
        ],
      },
      {
        id: 'ardenne-discovery-weekend',
        title: 'Ardennes discovery weekend',
        description: 'A simple glimpse of emblematic places to discover around Libin.',
        ideas: [
          'Visit Redu, the book village',
          'An escape to Bouillon',
          'Discover Mirwart',
          'A walk or a local restaurant',
        ],
        ctas: [
          { label: 'Explore the surroundings', href: around },
          { label: 'See villages', href: `${around}#villages-patrimoine` },
        ],
      },
    ],
    nl: [
      {
        id: 'romantic-weekend',
        title: 'Romantisch weekend',
        description: 'Een zacht verblijf om elkaar terug te vinden en de rust van de Ardennen te voelen.',
        ideas: [
          'Dineren in een aanbevolen restaurant',
          'Een zachte wandeling in Redu of rond Libin',
          'Een rustige avond in de gîte',
          'Een trage ochtend voor vertrek',
        ],
        ctas: [
          { label: 'Bekijk restaurants', href: `${around}#restaurants` },
          { label: 'Bekijk wandelingen', href: `${around}#promenades` },
        ],
      },
      {
        id: 'nature-weekend',
        title: 'Natuurweekend',
        description: 'Bossen, dorpen en open ruimte om te vertragen en adem te halen.',
        ideas: [
          'Wandelen rond Libin',
          'Het Domein van Mirwart ontdekken',
          'Een boswandeling bij Saint-Hubert',
          'Pauzeren in een Ardens dorp',
        ],
        ctas: [
          { label: 'Bekijk wandelingen', href: `${around}#promenades` },
          { label: 'Ontdek de omgeving', href: around },
        ],
      },
      {
        id: 'rainy-cocooning-weekend',
        title: 'Regenachtig & gezellig weekend',
        description: 'Ook bij regen biedt de streek fijne ideeën om rustig te genieten.',
        ideas: [
          'Bezoek aan het Euro Space Center',
          'Een wellness- of spamoment',
          'Bowling of een indooractiviteit',
          'Een cosy avond in de gîte',
        ],
        ctas: [
          { label: 'Bekijk activiteiten bij regen', href: `${around}#pluie` },
          { label: 'Reserveren', href: booking },
        ],
      },
      {
        id: 'ardenne-discovery-weekend',
        title: 'Ontdek de Ardennen',
        description: 'Een eenvoudige kennismaking met markante plekken rond Libin.',
        ideas: [
          'Redu, het boekendorp, bezoeken',
          'Een uitstap naar Bouillon',
          'Mirwart ontdekken',
          'Een wandeling of streekrestaurant',
        ],
        ctas: [
          { label: 'Ontdek de omgeving', href: around },
          { label: 'Bekijk dorpen', href: `${around}#villages-patrimoine` },
        ],
      },
    ],
  } satisfies Record<Locale, StayIdea[]>;

  return content[locale];
}

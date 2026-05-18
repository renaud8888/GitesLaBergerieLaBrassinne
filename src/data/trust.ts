import type { Locale } from '@/lib/i18n';

export type TrustGite = 'bergerie' | 'brassine';

export const trustContent = {
  fr: {
    eyebrow: 'Confiance',
    homeTitle: 'Un séjour pensé pour votre confort',
    homeText: 'Deux gîtes de charme, des voyageurs conquis et tout le nécessaire pour profiter d’une parenthèse à deux dans les Ardennes.',
    bookingTitle: 'Pourquoi réserver chez nous ?',
    bookingText: 'Des avis rassurants, un contact direct et tout le confort nécessaire pour préparer votre séjour en toute sérénité.',
    compactTitle: 'Réservez en toute sérénité',
    seeGites: 'Voir les gîtes',
    book: 'Réserver',
    cards: {
      reviews: {
        title: 'Avis voyageurs',
        text: 'Les deux gîtes affichent 5/5 sur Airbnb, avec des retours nombreux et rassurants.',
      },
      comfort: {
        title: 'Confort sur place',
        text: 'Tout est prévu pour arriver sereinement et profiter sans devoir improviser.',
      },
      booking: {
        title: 'Réservation flexible',
        text: 'WhatsApp, formulaire ou Airbnb : choisissez le canal qui vous convient le mieux.',
      },
      couples: {
        title: 'Séjour pensé pour deux',
        text: 'Deux ambiances, une même attention au détail : La Bergerie plus spacieuse, La Brassinne plus intime, avec un décor fait main avec passion par Clara.',
      },
    },
    proofs: {
      parking: 'Parking gratuit',
      wifi: 'Wi-Fi',
      linen: 'Linge fourni',
      bedReady: 'Lit préparé à l’arrivée',
      kitchen: 'Cuisine équipée',
      whatsapp: 'Contact direct par WhatsApp',
      airbnb: 'Réservation possible via Airbnb',
      couples: 'Deux gîtes pensés pour un séjour à deux',
      handmade: 'Fait main avec passion par Clara',
    },
  },
  en: {
    eyebrow: 'Trust',
    homeTitle: 'A stay designed for your comfort',
    homeText: 'Two charming gites, delighted guests and everything you need for a peaceful Ardennes getaway for two.',
    bookingTitle: 'Why book with us?',
    bookingText: 'Reassuring reviews, direct contact and all the comfort you need to prepare your stay with confidence.',
    compactTitle: 'Book with peace of mind',
    seeGites: 'View the gites',
    book: 'Book',
    cards: {
      reviews: {
        title: 'Guest reviews',
        text: 'Both gites show 5/5 on Airbnb, with many reassuring guest reviews.',
      },
      comfort: {
        title: 'Comfort on site',
        text: 'Everything is prepared so you can arrive calmly and enjoy the stay without improvising.',
      },
      booking: {
        title: 'Flexible booking',
        text: 'WhatsApp, booking form or Airbnb: choose the channel that feels easiest.',
      },
      couples: {
        title: 'Designed for two',
        text: 'Two atmospheres, one attention to detail: La Bergerie is more spacious, La Brassinne more intimate, with decor handmade with passion by Clara.',
      },
    },
    proofs: {
      parking: 'Free parking',
      wifi: 'Wi-Fi',
      linen: 'Linen provided',
      bedReady: 'Bed ready on arrival',
      kitchen: 'Equipped kitchen',
      whatsapp: 'Direct contact via WhatsApp',
      airbnb: 'Booking available via Airbnb',
      couples: 'Two gites designed for a stay for two',
      handmade: 'Handmade with passion by Clara',
    },
  },
  nl: {
    eyebrow: 'Vertrouwen',
    homeTitle: 'Een verblijf ontworpen voor uw comfort',
    homeText: 'Twee charmante gîtes, tevreden gasten en alles wat u nodig hebt voor een rustige Ardennenpauze met twee.',
    bookingTitle: 'Waarom bij ons reserveren?',
    bookingText: 'Geruststellende beoordelingen, direct contact en al het comfort om uw verblijf met vertrouwen voor te bereiden.',
    compactTitle: 'Reserveer met een gerust gevoel',
    seeGites: 'Bekijk de gîtes',
    book: 'Reserveren',
    cards: {
      reviews: {
        title: 'Gastenreviews',
        text: 'Beide gîtes tonen 5/5 op Airbnb, met veel geruststellende beoordelingen.',
      },
      comfort: {
        title: 'Comfort ter plaatse',
        text: 'Alles is voorbereid zodat u rustig aankomt en zonder improviseren van het verblijf geniet.',
      },
      booking: {
        title: 'Flexibel reserveren',
        text: 'WhatsApp, reserveringsformulier of Airbnb: kies het kanaal dat het makkelijkst voelt.',
      },
      couples: {
        title: 'Ontworpen voor twee',
        text: 'Twee sferen, dezelfde aandacht voor detail: La Bergerie is ruimer, La Brassinne intiemer, met decoratie die met passie door Clara werd gemaakt.',
      },
    },
    proofs: {
      parking: 'Gratis parking',
      wifi: 'Wi-Fi',
      linen: 'Linnengoed voorzien',
      bedReady: 'Bed opgemaakt bij aankomst',
      kitchen: 'Uitgeruste keuken',
      whatsapp: 'Direct contact via WhatsApp',
      airbnb: 'Reserveren mogelijk via Airbnb',
      couples: 'Twee gîtes voor een verblijf met twee',
      handmade: 'Met passie door Clara gemaakt',
    },
  },
} as const satisfies Record<Locale, Record<string, unknown>>;

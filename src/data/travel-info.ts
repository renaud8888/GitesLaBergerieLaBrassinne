import type { Locale } from '@/lib/i18n';

export const travelInfoConfig = {
  drivingTimes: [
    {
      from: { en: 'Brussels', nl: 'Brussel' },
      duration: { en: 'Approx. 1h30-1h45', nl: 'Ongeveer 1u30-1u45' },
    },
    {
      from: { en: 'Luxembourg City', nl: 'Luxemburg-stad' },
      duration: { en: 'Approx. 1h15-1h30', nl: 'Ongeveer 1u15-1u30' },
    },
    {
      from: { en: 'Namur', nl: 'Namen' },
      duration: { en: 'Approx. 1h00-1h15', nl: 'Ongeveer 1u00-1u15' },
    },
    {
      from: { en: 'Liège', nl: 'Luik' },
      duration: { en: 'Approx. 1h15-1h30', nl: 'Ongeveer 1u15-1u30' },
    },
  ],
  trainStations: [
    {
      name: 'Libramont',
      note: {
        en: 'Usually the most practical and better connected station.',
        nl: 'Meestal het meest praktische en best bediende station.',
      },
    },
    {
      name: 'Poix-Saint-Hubert',
      note: {
        en: 'Sometimes closer, but less convenient depending on connections.',
        nl: 'Soms dichterbij, maar minder handig afhankelijk van de verbindingen.',
      },
    },
  ],
} as const;

export const internationalTravelContent = {
  en: {
    eyebrow: 'Getting here',
    title: 'Planning your stay in the Belgian Ardennes',
    subtitle:
      'La Bergerie & La Brassinne are located in Libin, a peaceful village in the Belgian Ardennes, ideal for a romantic stay surrounded by nature.',
    locationTitle: 'Where we are',
    locationText:
      'Libin is located in the Province of Luxembourg, Belgium, in a quiet natural area with forests, villages and Ardennes landscapes nearby.',
    carTitle: 'Coming by car',
    carText:
      'A car is strongly recommended to fully enjoy the area and easily reach restaurants, walks and activities.',
    trainTitle: 'Coming by train',
    trainText:
      'Libramont is usually the most practical station. Poix-Saint-Hubert can be closer, but is often less convenient depending on connections.',
    languageTitle: 'Booking & language',
    languageText:
      'Book by WhatsApp, through the booking form, or via Airbnb. The website is available in English and Dutch to help you prepare your stay. The host mainly speaks French.',
    mapsCta: 'Open Google Maps directions',
    bookingCta: 'Book',
    contactCta: 'Contact us',
  },
  nl: {
    eyebrow: 'Er geraken',
    title: 'Uw verblijf in de Belgische Ardennen voorbereiden',
    subtitle:
      'La Bergerie & La Brassinne liggen in Libin, een rustig dorp in de Belgische Ardennen, ideaal voor een romantisch verblijf in de natuur.',
    locationTitle: 'Waar we zijn',
    locationText:
      'Libin ligt in de provincie Luxemburg, België, in een rustige natuurlijke omgeving met bossen, dorpen en Ardense landschappen dichtbij.',
    carTitle: 'Met de auto',
    carText:
      'Een auto is sterk aanbevolen om de streek comfortabel te ontdekken en gemakkelijk restaurants, wandelingen en activiteiten te bereiken.',
    trainTitle: 'Met de trein',
    trainText:
      'Station Libramont is meestal de meest praktische optie. Station Poix-Saint-Hubert kan dichterbij zijn, maar is vaak minder handig afhankelijk van de verbindingen.',
    languageTitle: 'Reserveren & taal',
    languageText:
      'Reserveer via WhatsApp, via het reserveringsformulier of via Airbnb. De website is beschikbaar in het Engels en Nederlands om uw verblijf voor te bereiden. De host spreekt voornamelijk Frans.',
    mapsCta: 'Route openen in Google Maps',
    bookingCta: 'Reserveren',
    contactCta: 'Contact opnemen',
  },
} as const satisfies Partial<Record<Locale, Record<string, string>>>;

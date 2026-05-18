import type { Locale } from '@/lib/i18n';

export const ownerStoryContent = {
  fr: {
    title: 'Un lieu pensé avec passion par Clara',
    shortTitle: 'Un accueil humain',
    text: 'Derrière La Bergerie et La Brassinne, il y a Clara, son goût du détail et son envie de créer des lieux où l’on se sent bien. Peintures, fleurs, papiers peints, objets choisis, ambiances : chaque élément a été pensé avec soin pour offrir un séjour chaleureux, authentique et plein de charme.',
    compactText: 'Tout a été fait main et avec passion par Clara : les peintures, les fleurs, les papiers peints et chaque détail de décoration ont été imaginés pour créer une atmosphère unique.',
    badge: 'Fait main avec passion par Clara',
    detail: 'Décor pensé dans les moindres détails',
    imageAlt: 'Clara, propriétaire des gîtes, avec son chat',
  },
  en: {
    title: 'A place designed with passion by Clara',
    shortTitle: 'A warm human welcome',
    text: 'Behind La Bergerie and La Brassinne is Clara: her eye for detail and her wish to create places where guests feel truly well. Paint, flowers, wallpapers, chosen objects and atmosphere have all been carefully designed to offer a warm, authentic and charming stay.',
    compactText: 'Everything has been handmade with passion by Clara: the paintwork, flowers, wallpapers and every decorative detail were imagined to create a unique atmosphere.',
    badge: 'Handmade with passion by Clara',
    detail: 'Every detail carefully designed',
    imageAlt: 'Clara, the owner of the gites, with her cat',
  },
  nl: {
    title: 'Een plek met passie bedacht door Clara',
    shortTitle: 'Een persoonlijk en warm onthaal',
    text: 'Achter La Bergerie en La Brassinne staat Clara: haar oog voor detail en haar zin om plekken te creëren waar gasten zich goed voelen. Verf, bloemen, behang, gekozen objecten en sfeer zijn met zorg bedacht voor een warm, authentiek en charmant verblijf.',
    compactText: 'Alles werd met passie door Clara gemaakt: de verf, de bloemen, het behang en elk decoratief detail werden bedacht om een unieke sfeer te creëren.',
    badge: 'Met passie door Clara gemaakt',
    detail: 'Elk detail zorgvuldig bedacht',
    imageAlt: 'Clara, eigenares van de gîtes, met haar kat',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export const ownerStoryImage = {
  src: '',
} as const;

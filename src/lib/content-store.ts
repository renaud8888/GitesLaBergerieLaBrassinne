import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';

import { unstable_noStore as noStore } from 'next/cache';
import { get as getBlob, put as putBlob } from '@vercel/blob';

import en from '@/content/locales/en/common.json';
import fr from '@/content/locales/fr/common.json';
import nl from '@/content/locales/nl/common.json';
import { extraLocaleContent } from '@/data/extra-locale-content';
import { aroundSectionImages, giteStats } from '@/data/site';
import type { Locale } from '@/lib/i18n';

const CONTENT_OVERRIDES_PATH = path.join(process.cwd(), 'data', 'content-overrides.json');
const CONTENT_OVERRIDES_BLOB_PATH = 'site-content/content-overrides.json';
const localeDefaults = { fr, en, nl } as const;
const PUBLIC_DIRECTORY = path.join(process.cwd(), 'public');

export const defaultImageContent = {
  branding: {
    logo: '/images/branding/logo.png',
    favicon: '/images/branding/favicon.ico',
    ogImage: '/images/branding/og-image.svg',
  },
  home: {
    heroImage: '/images/home/1.avif',
    sideImage: '/images/home/5b.avif',
  },
  gites: {
    bergerie: {
      heroImage: giteStats.bergerie.heroImage,
      gallery: giteStats.bergerie.gallery,
    },
    brassine: {
      heroImage: giteStats.brassine.heroImage,
      gallery: giteStats.brassine.gallery,
    },
  },
  around: {
    heroImage: '/images/around/mirwart.jpg',
    specialImages: {
      cycling: '/images/around/velo.jpg',
      mirwart: '/images/around/mirwart.jpg',
      redu: '/images/around/redu.jpg',
      books: '/images/around/redu1.jpeg',
      lesse: '/images/around/lesse1.jpg',
      forest: '/images/around/foret1.jpg',
      fallback: '/images/around/default.jpg',
    },
    sectionFallbacks: aroundSectionImages,
  },
  guide: {
    heroImage: '/images/home/6.avif',
  },
  contact: {
    heroImage: '/images/home/6b.avif',
  },
} as const;

type Primitive = string | number | boolean | null;
type JsonValue = Primitive | JsonValue[] | { [key: string]: JsonValue };
type FlatEntry = {
  key: string;
  label: string;
  group: string;
  locale?: Locale;
  type: 'text' | 'image';
  value: string;
  defaultValue: string;
};

type PersistedOverrides = {
  texts?: Record<string, string>;
  images?: Record<string, string>;
};

type PathSegment = string | number;

function isVercelBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function isRunningOnVercel() {
  return process.env.VERCEL === '1';
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function deepMerge<T extends Record<string, unknown>>(base: T, extra: Record<string, unknown>) {
  const output = deepClone(base) as Record<string, unknown>;

  for (const [key, value] of Object.entries(extra)) {
    const existing = output[key];

    if (Array.isArray(value)) {
      output[key] = deepClone(value);
      continue;
    }

    if (value && typeof value === 'object' && existing && typeof existing === 'object' && !Array.isArray(existing)) {
      output[key] = deepMerge(existing as Record<string, unknown>, value as Record<string, unknown>);
      continue;
    }

    output[key] = value;
  }

  return output as T;
}

function pathToSegments(pathValue: string) {
  return pathValue.split('.').map((segment) => (/^\d+$/.test(segment) ? Number(segment) : segment));
}

function setValueAtPath(target: Record<string, unknown> | unknown[], segments: PathSegment[], value: unknown) {
  let current: Record<string, unknown> | unknown[] = target;

  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index];
    const nextSegment = segments[index + 1];
    const nextValue =
      typeof nextSegment === 'number'
        ? []
        : {};

    if (typeof segment === 'number') {
      if (!Array.isArray(current)) {
        return;
      }

      current[segment] ??= nextValue;
      current = current[segment] as Record<string, unknown> | unknown[];
      continue;
    }

    if (Array.isArray(current)) {
      return;
    }

    current[segment] ??= nextValue;
    current = current[segment] as Record<string, unknown> | unknown[];
  }

  const lastSegment = segments[segments.length - 1];

  if (typeof lastSegment === 'number') {
    if (Array.isArray(current)) {
      current[lastSegment] = value;
    }
    return;
  }

  if (!Array.isArray(current)) {
    current[lastSegment] = value;
  }
}

function isImageValue(key: string, value: string) {
  if (key.endsWith('.src')) {
    return true;
  }

  return /\/images\/|\.avif$|\.png$|\.jpe?g$|\.webp$|\.svg$|\.ico$/i.test(value);
}

function shouldSkipTextKey(key: string) {
  return key.endsWith('.icon') || key.endsWith('.key');
}

function humanizeSegment(segment: string) {
  const labels: Record<string, string> = {
    ui: 'Interface',
    brand: 'Marque',
    header: 'En-tête',
    footer: 'Pied de page',
    home: 'Accueil',
    hero: 'Hero',
    heroCard: 'Carte hero',
    intro: 'Introduction',
    highlights: 'Points forts',
    gites: 'Gîtes',
    common: 'Commun',
    guide: 'Guide pratique',
    contact: 'Contact',
    contactForm: 'Formulaire de contact',
    whatsappFab: 'Bouton WhatsApp',
    around: 'Alentours',
    finalCta: 'Appel à l’action final',
    reviews: 'Avis',
    reviewHighlight: 'Avis mis en avant',
    romantic: 'Options romantiques',
    region: 'Région',
    gallery: 'Galerie',
    equipment: 'Équipements',
    meta: 'Métadonnées',
    nav: 'Navigation',
    story: 'Présentation',
    outdoor: 'Extérieur',
    stayInfo: 'Infos séjour',
    practicalCards: 'Cartes pratiques',
    labels: 'Libellés',
    options: 'Options',
    sections: 'Sections',
    faq: 'FAQ',
    title: 'Titre',
    text: 'Texte',
    description: 'Description',
    eyebrow: 'Sur-titre',
    lead: 'Texte d’introduction',
    paragraphs: 'Paragraphes',
    items: 'Éléments',
    images: 'Images',
    name: 'Nom',
    tagline: 'Accroche',
    capacity: 'Capacité',
    question: 'Question',
    answer: 'Réponse',
    author: 'Auteur',
    origin: 'Source',
    reserve: 'Réservation',
    direct: 'Contact direct',
    practicalTitle: 'Titre pratique',
    addressTitle: 'Titre adresse',
    form: 'Formulaire',
    quickFacts: 'Infos rapides',
    sideEyebrow: 'Sur-titre latéral',
    sideTitle: 'Titre latéral',
    sideText: 'Texte latéral',
    primaryCta: 'Bouton principal',
    secondaryCta: 'Bouton secondaire',
    imageAlt: 'Texte alternatif image',
    guests: 'Invités',
    bedroom: 'Chambre',
    bed: 'Lit',
    bathroom: 'Salle de bain',
    socialProofLabel: 'Libellé preuve sociale',
    socialProofValue: 'Valeur preuve sociale',
    socialProofReviews: 'Texte avis preuve sociale',
    locationLabel: 'Libellé lieu',
    locationValue: 'Valeur lieu',
    locationText: 'Texte lieu',
    stayLabel: 'Libellé séjour',
    stayValue: 'Valeur séjour',
    stayText: 'Texte séjour',
    googleLabel: 'Libellé Google',
    airbnbLabel: 'Libellé Airbnb',
    whatsappLabel: 'Libellé WhatsApp',
    travelerReviewsLabel: 'Libellé avis voyageurs',
    googleReviewsLabel: 'Libellé avis Google',
    firstImpressionsEyebrow: 'Sur-titre premières impressions',
    firstImpressionsTitle: 'Titre premières impressions',
    highlightsDescription: 'Description points forts',
    bookingCardTitle: 'Titre carte réservation',
    bookingCardText: 'Texte carte réservation',
    heroSecondaryCta: 'Bouton secondaire hero',
    overviewTitle: 'Titre vue d’ensemble',
    overviewText: 'Texte vue d’ensemble',
    supportTitle: 'Titre aide',
    supportText: 'Texte aide',
    supportButton: 'Bouton aide',
    faqCta: 'Bouton FAQ',
    directAirbnbBergerie: 'Bouton Airbnb La Bergerie',
    directAirbnbBrassine: 'Bouton Airbnb La Brassine',
    quickResponseTitle: 'Titre réponse rapide',
    quickResponseText: 'Texte réponse rapide',
    clearBookingTitle: 'Titre réservation claire',
    clearBookingText: 'Texte réservation claire',
    responseCardTitle: 'Titre carte réponse',
    responseCardText: 'Texte carte réponse',
    inboxTitle: 'Titre adresse de réception',
    inboxText: 'Texte adresse de réception',
    introText: 'Texte intro',
    reassurance: 'Texte de réassurance',
    openMenuAria: 'Label aria menu',
    ariaLabel: 'Label aria',
  };

  if (labels[segment]) {
    return labels[segment];
  }

  return segment
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function buildLabel(key: string, locale?: Locale) {
  const cleanKey = locale ? key.replace(`${locale}.`, '') : key.replace(/^images\./, '');
  const parts = cleanKey.split('.');
  const label = parts.map((part) => humanizeSegment(part)).join(' · ');
  return locale ? `${locale.toUpperCase()} · ${label}` : label;
}

function buildGroup(key: string, locale?: Locale) {
  const cleanKey = locale ? key.replace(`${locale}.`, '') : key.replace(/^images\./, '');
  const [first, second] = cleanKey.split('.');
  const pieces = [humanizeSegment(first)];

  if (second && second !== 'items' && second !== 'sections' && second !== 'gallery') {
    pieces.push(humanizeSegment(second));
  }

  return locale ? `${locale.toUpperCase()} · ${pieces.join(' / ')}` : pieces.join(' / ');
}

async function listPublicFiles(relativeDirectory: string) {
  const directory = path.join(PUBLIC_DIRECTORY, relativeDirectory);

  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

async function getExistingGalleryImages(folder: 'la-bergerie' | 'la-brassine') {
  const files = await listPublicFiles(path.join('images', folder));

  return files
    .map((fileName) => {
      const match = fileName.match(/^(\d+)\.avif$/i);

      if (!match) {
        return null;
      }

      return {
        order: Number(match[1]),
        src: `/images/${folder}/${fileName}`,
      };
    })
    .filter((entry): entry is { order: number; src: string } => entry !== null)
    .sort((left, right) => left.order - right.order)
    .map((entry) => entry.src);
}

async function fileExists(publicPath: string) {
  try {
    await fs.access(path.join(PUBLIC_DIRECTORY, publicPath.replace(/^\//, '')));
    return true;
  } catch {
    return false;
  }
}

function collectEditableEntries(
  value: JsonValue,
  options: {
    keyPrefix: string;
    locale?: Locale;
    entries: FlatEntry[];
    overrides: Record<string, string>;
  },
  pathParts: string[] = [],
) {
  if (typeof value === 'string') {
    const relativeKey = pathParts.join('.');
    const fullKey = `${options.keyPrefix}.${relativeKey}`;
    const type = isImageValue(fullKey, value) ? 'image' : 'text';

    if (type === 'text' && shouldSkipTextKey(fullKey)) {
      return;
    }

    const overrideValue = options.overrides[fullKey];

    options.entries.push({
      key: fullKey,
      label: buildLabel(fullKey, options.locale),
      group: buildGroup(fullKey, options.locale),
      locale: options.locale,
      type,
      value: overrideValue ?? value,
      defaultValue: value,
    });
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectEditableEntries(item as JsonValue, options, [...pathParts, String(index)]));
    return;
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, nestedValue]) => {
      collectEditableEntries(nestedValue as JsonValue, options, [...pathParts, key]);
    });
  }
}

async function ensureOverridesFile() {
  await fs.mkdir(path.dirname(CONTENT_OVERRIDES_PATH), { recursive: true });

  try {
    await fs.access(CONTENT_OVERRIDES_PATH);
  } catch {
    await fs.writeFile(
      CONTENT_OVERRIDES_PATH,
      JSON.stringify({ texts: {}, images: {} }, null, 2),
      'utf8',
    );
  }
}

async function readOverrides(): Promise<PersistedOverrides> {
  if (isVercelBlobConfigured()) {
    const blobResult = await getBlob(CONTENT_OVERRIDES_BLOB_PATH, {
      access: 'private',
    });

    if (!blobResult) {
      return { texts: {}, images: {} };
    }

    const response = new Response(blobResult.stream);
    const file = await response.text();

    try {
      return JSON.parse(file) as PersistedOverrides;
    } catch {
      return { texts: {}, images: {} };
    }
  }

  await ensureOverridesFile();
  const file = await fs.readFile(CONTENT_OVERRIDES_PATH, 'utf8');

  try {
    return JSON.parse(file) as PersistedOverrides;
  } catch {
    return { texts: {}, images: {} };
  }
}

async function writeOverrides(overrides: PersistedOverrides) {
  if (isVercelBlobConfigured()) {
    await putBlob(
      CONTENT_OVERRIDES_BLOB_PATH,
      JSON.stringify(overrides, null, 2),
      {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
      },
    );
    return;
  }

  await ensureOverridesFile();
  await fs.writeFile(CONTENT_OVERRIDES_PATH, JSON.stringify(overrides, null, 2), 'utf8');
}

export function getContentStorageMode() {
  if (isVercelBlobConfigured()) {
    return 'vercel-blob' as const;
  }

  if (isRunningOnVercel()) {
    return 'missing-vercel-blob' as const;
  }

  return 'local-file' as const;
}

function getDefaultRuntimeDictionary(locale: Locale) {
  return deepMerge(localeDefaults[locale], extraLocaleContent[locale]);
}

export async function getDictionary(locale: Locale) {
  noStore();

  const dictionary = getDefaultRuntimeDictionary(locale) as Record<string, unknown>;
  const overrides = await readOverrides();

  Object.entries(overrides.texts ?? {}).forEach(([key, value]) => {
    if (!key.startsWith(`${locale}.`)) {
      return;
    }

    const relativePath = key.slice(locale.length + 1);
    setValueAtPath(dictionary, pathToSegments(relativePath), value);
  });

  return dictionary as typeof fr & (typeof extraLocaleContent)['fr'];
}

export async function getSiteImages() {
  noStore();

  const images = deepClone(defaultImageContent) as Record<string, unknown>;
  const [bergerieGallery, brassineGallery] = await Promise.all([
    getExistingGalleryImages('la-bergerie'),
    getExistingGalleryImages('la-brassine'),
  ]);

  setValueAtPath(images, ['gites', 'bergerie', 'gallery'], bergerieGallery.length > 0 ? bergerieGallery : defaultImageContent.gites.bergerie.gallery);
  setValueAtPath(images, ['gites', 'brassine', 'gallery'], brassineGallery.length > 0 ? brassineGallery : defaultImageContent.gites.brassine.gallery);

  const bergerieHero = bergerieGallery[0] ?? defaultImageContent.gites.bergerie.heroImage;
  const brassineHero = brassineGallery[0] ?? defaultImageContent.gites.brassine.heroImage;

  setValueAtPath(images, ['gites', 'bergerie', 'heroImage'], bergerieHero);
  setValueAtPath(images, ['gites', 'brassine', 'heroImage'], brassineHero);

  if (!(await fileExists(defaultImageContent.around.specialImages.fallback))) {
    setValueAtPath(images, ['around', 'specialImages', 'fallback'], defaultImageContent.around.heroImage);
    setValueAtPath(images, ['around', 'sectionFallbacks', 'rainy'], defaultImageContent.around.heroImage);
  }

  const overrides = await readOverrides();

  Object.entries(overrides.images ?? {}).forEach(([key, value]) => {
    const relativePath = key.replace(/^images\./, '');
    setValueAtPath(images, pathToSegments(relativePath), value);
  });

  return images as typeof defaultImageContent;
}

export async function getAdminContentEntries() {
  noStore();

  const overrides = await readOverrides();
  const entries: FlatEntry[] = [];

  (['fr', 'en', 'nl'] as Locale[]).forEach((locale) => {
    collectEditableEntries(getDefaultRuntimeDictionary(locale) as unknown as JsonValue, {
      keyPrefix: locale,
      locale,
      entries,
      overrides: overrides.texts ?? {},
    });
  });

  collectEditableEntries(defaultImageContent as unknown as JsonValue, {
    keyPrefix: 'images',
    entries,
    overrides: overrides.images ?? {},
  });

  return entries.sort((left, right) => left.label.localeCompare(right.label, 'fr'));
}

export async function updateAdminContentEntry({
  key,
  value,
}: {
  key: string;
  value: string;
}) {
  const overrides = await readOverrides();
  const defaultEntries = await getAdminContentEntries();
  const entry = defaultEntries.find((item) => item.key === key);

  if (!entry) {
    throw new Error(`Unknown content key: ${key}`);
  }

  if (entry.type === 'image') {
    overrides.images ??= {};

    if (value === entry.defaultValue) {
      delete overrides.images[key];
    } else {
      overrides.images[key] = value;
    }
  } else {
    overrides.texts ??= {};

    if (value === entry.defaultValue) {
      delete overrides.texts[key];
    } else {
      overrides.texts[key] = value;
    }
  }

  await writeOverrides(overrides);

  return {
    ...entry,
    value,
  };
}

export function resolveAroundImage(
  images: Awaited<ReturnType<typeof getSiteImages>>,
  sectionKey: string,
  itemName: string,
) {
  const name = itemName.toLowerCase();

  if (sectionKey === 'cycling') return images.around.specialImages.cycling;
  if (name.includes('mirwart')) return images.around.specialImages.mirwart;
  if (name.includes('redu')) return images.around.specialImages.redu;
  if (name.includes('livre') || name.includes('boek')) return images.around.specialImages.books;
  if (name.includes('lesse') || name.includes('kayak')) return images.around.specialImages.lesse;
  if (name.includes('forêt') || name.includes('foret') || name.includes('saint-hubert')) return images.around.specialImages.forest;

  return images.around.sectionFallbacks[sectionKey as keyof typeof images.around.sectionFallbacks] ?? images.around.specialImages.fallback;
}

import type { Metadata } from 'next';
import { CalendarCheck, Footprints, MapPin, MessageCircle, Utensils } from 'lucide-react';

import { ButtonLink } from '@/components/common/button-link';
import { WhatsAppIcon } from '@/components/common/brand-icons';
import { GuidePanels } from '@/components/common/guide-panels';
import { ImageFallback } from '@/components/common/image-fallback';
import { InternationalTravelInfo } from '@/components/common/international-travel-info';
import { getGuideFaq } from '@/data/faq';
import { getWhatsappLink, siteConfig } from '@/data/site';
import { getSiteImages } from '@/lib/content-store';
import { getDictionary } from '@/lib/dictionaries';
import { createPageMetadata } from '@/lib/metadata';
import { getBookingPath, type Locale } from '@/lib/i18n';
import { formatWhatsappLink } from '@/lib/utils';

const guideActions = {
  fr: {
    eyebrow: 'Accès rapide',
    title: 'Les actions utiles avant et pendant le séjour',
    directions: "Ouvrir l'itinéraire Google Maps",
    arrival: "Envoyer mon heure d'arrivée sur WhatsApp",
    restaurants: 'Voir les restaurants',
    walks: 'Voir les promenades',
    booking: 'Réserver',
    contact: "Contacter l'hôte",
    arrivalMessage: "Bonjour, je souhaite vous communiquer mon heure d'arrivée pour mon séjour à La Bergerie / La Brassinne :",
  },
  en: {
    eyebrow: 'Quick access',
    title: 'Useful actions before and during your stay',
    directions: 'Open Google Maps directions',
    arrival: 'Send my arrival time on WhatsApp',
    restaurants: 'See restaurants',
    walks: 'See walks',
    booking: 'Book',
    contact: 'Contact the host',
    arrivalMessage: 'Hello, I would like to share my arrival time for my stay at La Bergerie / La Brassinne:',
  },
  nl: {
    eyebrow: 'Snelle toegang',
    title: 'Nuttige acties voor en tijdens uw verblijf',
    directions: 'Route openen in Google Maps',
    arrival: 'Mijn aankomstuur via WhatsApp sturen',
    restaurants: 'Bekijk restaurants',
    walks: 'Bekijk wandelingen',
    booking: 'Reserveren',
    contact: 'Contacteer de host',
    arrivalMessage: 'Hallo, ik wil graag mijn aankomstuur doorgeven voor mijn verblijf bij La Bergerie / La Brassinne:',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return createPageMetadata({
    locale,
    path: 'guide-pratique',
    title: dict.guide.meta.title,
    description: dict.guide.meta.description,
    image: 'https://bergerie-brassine.com/images/home/4.avif',
  });
}

export default async function GuidePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const guide = dict.guide;
  const guideFaq = getGuideFaq(locale);
  const actions = guideActions[locale];
  const images = await getSiteImages();
  const whatsappUrl = getWhatsappLink(locale);
  const arrivalWhatsappUrl = formatWhatsappLink(siteConfig.phone, actions.arrivalMessage);

  return (
    <>
      <section className="relative overflow-hidden bg-taupe-900 py-20 text-cream-50">
        <div className="absolute inset-0">
          <ImageFallback src={images.guide.heroImage} alt={guide.hero.title} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,34,29,0.35),rgba(45,34,29,0.85))]" />
        </div>
        <div className="section-shell relative z-10">
          <p className="eyebrow-chip border-white/16 bg-white/8 text-cream-100">{guide.hero.eyebrow}</p>
          <h1 className="text-balance mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl md:text-7xl">{guide.hero.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-100/84">{guide.hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={whatsappUrl} variant="whatsapp" external icon={<WhatsAppIcon className="h-4 w-4" />}>
              {dict.ui.guide.whatsappLabel}
            </ButtonLink>
            <ButtonLink href={`/${locale}/contact`} variant="secondary" className="border-white/16 bg-white/10 text-white">
              {dict.ui.guide.heroSecondaryCta}
            </ButtonLink>
          </div>
        </div>
      </section>

      <InternationalTravelInfo locale={locale} />

      <section className="section-space pb-0">
        <div className="section-shell-wide">
          <div className="surface-card-strong p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-wood">{actions.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl leading-none text-taupe-900 md:text-5xl">{actions.title}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <ButtonLink href={siteConfig.mapsUrl} external variant="secondary" className="w-full justify-center" icon={<MapPin className="h-4 w-4" />}>
                {actions.directions}
              </ButtonLink>
              <ButtonLink href={arrivalWhatsappUrl} external variant="whatsapp" className="w-full justify-center" icon={<WhatsAppIcon className="h-4 w-4" />}>
                {actions.arrival}
              </ButtonLink>
              <ButtonLink href={`/${locale}/alentours#restaurants`} variant="secondary" className="w-full justify-center" icon={<Utensils className="h-4 w-4" />}>
                {actions.restaurants}
              </ButtonLink>
              <ButtonLink href={`/${locale}/alentours#promenades`} variant="secondary" className="w-full justify-center" icon={<Footprints className="h-4 w-4" />}>
                {actions.walks}
              </ButtonLink>
              <ButtonLink href={getBookingPath(locale)} className="w-full justify-center" icon={<CalendarCheck className="h-4 w-4" />}>
                {actions.booking}
              </ButtonLink>
              <ButtonLink href={`/${locale}/contact`} variant="secondary" className="w-full justify-center" icon={<MessageCircle className="h-4 w-4" />}>
                {actions.contact}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell-wide">
          <GuidePanels
            overviewTitle={dict.ui.guide.overviewTitle}
            overviewText={dict.ui.guide.overviewText}
            quickFacts={guide.quickFacts}
            sections={guide.sections}
            faq={guideFaq}
            faqTitle={guide.faqTitle}
            faqEyebrow={guide.faqEyebrow}
            labels={{
              overviewNavTitle: dict.ui.guide.overviewNavTitle,
              overviewEyebrow: dict.ui.guide.overviewEyebrow,
            }}
          />
        </div>
      </section>

      <section className="section-space section-tint-soft">
        <div className="section-shell-wide">
          <div className="surface-card-strong flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="font-display text-4xl text-taupe-900">{dict.ui.guide.supportTitle}</p>
              <p className="mt-3 max-w-2xl text-base leading-8 text-taupe-500">{dict.ui.guide.supportText}</p>
            </div>
            <ButtonLink href={whatsappUrl} variant="whatsapp" external icon={<WhatsAppIcon className="h-4 w-4" />}>
              {dict.ui.guide.supportButton}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-space bg-white/35">
        <div className="section-shell-wide">
          <div className="surface-card-strong flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="font-display text-4xl text-taupe-900">{guide.faqTitle}</p>
              <p className="mt-3 max-w-2xl text-base leading-8 text-taupe-500">{guide.faqDescription}</p>
            </div>
            <ButtonLink href={`/${locale}/contact`} variant="secondary" icon={<MessageCircle size={16} />}>
              {dict.ui.guide.faqCta}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

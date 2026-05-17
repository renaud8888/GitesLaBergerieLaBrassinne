import { Car, Languages, MapPin, TrainFront } from 'lucide-react';

import { ButtonLink } from '@/components/common/button-link';
import { siteConfig } from '@/data/site';
import { internationalTravelContent, travelInfoConfig } from '@/data/travel-info';
import { getBookingPath, type Locale } from '@/lib/i18n';

export function InternationalTravelInfo({ locale }: { locale: Locale }) {
  if (locale === 'fr') {
    return null;
  }

  const content = internationalTravelContent[locale];
  const cards = [
    {
      title: content.locationTitle,
      text: content.locationText,
      icon: MapPin,
      detail: locale === 'en' ? `${siteConfig.address.city}, Belgian Ardennes` : `${siteConfig.address.city}, Belgische Ardennen`,
    },
    {
      title: content.carTitle,
      text: content.carText,
      icon: Car,
      detail: travelInfoConfig.drivingTimes.map((time) => `${time.from[locale]} · ${time.duration[locale]}`).join('\n'),
    },
    {
      title: content.trainTitle,
      text: content.trainText,
      icon: TrainFront,
      detail: travelInfoConfig.trainStations.map((station) => `${station.name} · ${station.note[locale]}`).join('\n'),
    },
    {
      title: content.languageTitle,
      text: content.languageText,
      icon: Languages,
      detail: locale === 'en' ? 'Host language: French' : 'Taal van de host: Frans',
    },
  ];

  return (
    <section className="section-space section-tint-soft">
      <div className="section-shell">
        <div className="surface-card-strong overflow-hidden p-6 md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-wood">{content.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl leading-none text-taupe-900 md:text-5xl">{content.title}</h2>
            <p className="mt-5 text-base leading-8 text-taupe-500">{content.subtitle}</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <article key={card.title} className="rounded-[1.45rem] border border-white/70 bg-white/82 p-5 shadow-[0_14px_34px_rgba(89,63,49,0.06)]">
                  <div className="inline-flex rounded-full bg-rose-100 p-3 text-taupe-700">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl leading-none text-taupe-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-taupe-500">{card.text}</p>
                  <div className="mt-4 grid gap-2 text-sm leading-6 text-taupe-700">
                    {card.detail.split('\n').map((line) => (
                      <p key={line} className="rounded-[1rem] bg-cream-50/78 px-3 py-2">
                        {line}
                      </p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.mapsUrl} external variant="secondary" className="w-full justify-center md:w-fit">
              {content.mapsCta}
            </ButtonLink>
            <ButtonLink href={getBookingPath(locale)} className="w-full justify-center md:w-fit">
              {content.bookingCta}
            </ButtonLink>
            <ButtonLink href={`/${locale}/contact`} variant="secondary" className="w-full justify-center md:w-fit">
              {content.contactCta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';

import { ButtonLink } from '@/components/common/button-link';
import { ContactForm } from '@/components/common/contact-form';
import { ImageFallback } from '@/components/common/image-fallback';
import { SectionHeading } from '@/components/common/section-heading';
import { siteConfig } from '@/data/site';
import { getDictionary, type SiteDictionary } from '@/lib/dictionaries';
import { createPageMetadata } from '@/lib/metadata';
import { type Locale } from '@/lib/i18n';

type PracticalCard = SiteDictionary['contact']['practicalCards'][number];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return createPageMetadata({
    locale,
    path: 'contact',
    title: dict.contact.meta.title,
    description: dict.contact.meta.description,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const contact = dict.contact;

  return (
    <>
      <section className="relative overflow-hidden bg-taupe-900 py-20 text-cream-50">
        <div className="absolute inset-0">
          <ImageFallback src="/images/home/6b.avif" alt={contact.hero.title} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,34,29,0.3),rgba(45,34,29,0.86))]" />
        </div>
        <div className="section-shell relative z-10">
          <p className="text-xs uppercase tracking-[0.35em] text-cream-100/85">{contact.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-7xl">{contact.hero.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-100/84">{contact.hero.description}</p>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4">
            <article className="surface-card p-6 md:p-8">
              <SectionHeading eyebrow={contact.direct.eyebrow} title={contact.direct.title} description={contact.direct.text} />
              <div className="mt-6 grid gap-3">
                <ButtonLink href={siteConfig.whatsapp.default} variant="whatsapp" external>
                  {contact.direct.whatsapp}
                </ButtonLink>
                <ButtonLink href={siteConfig.airbnb.bergerie} variant="secondary" external>
                  Airbnb - La Bergerie
                </ButtonLink>
                <ButtonLink href={siteConfig.airbnb.brassine} variant="secondary" external>
                  Airbnb - La Brassine
                </ButtonLink>
                <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary" external>
                  {siteConfig.email}
                </ButtonLink>
              </div>
            </article>

            <article className="surface-card p-6 md:p-8">
              <p className="font-display text-3xl text-taupe-900">{contact.practicalTitle}</p>
              <div className="mt-5 grid gap-4">
                {contact.practicalCards.map((card: PracticalCard) => (
                  <div key={card.title} className="rounded-[1.4rem] bg-white p-5">
                    <p className="font-display text-2xl text-taupe-900">{card.title}</p>
                    <p className="mt-3 text-sm leading-7 text-taupe-500">{card.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface-card p-6 md:p-8">
              <p className="font-display text-3xl text-taupe-900">{contact.addressTitle}</p>
              <p className="mt-4 text-base leading-8 text-taupe-500">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
                <br />
                Belgique
              </p>
            </article>
          </div>

          <div>
            <SectionHeading eyebrow={contact.form.eyebrow} title={contact.form.title} description={contact.form.text} />
            <div className="mt-6">
              <ContactForm labels={contact.form.labels} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

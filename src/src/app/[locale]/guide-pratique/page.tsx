import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';

import { ButtonLink } from '@/components/common/button-link';
import { WhatsAppIcon } from '@/components/common/brand-icons';
import { GuidePanels } from '@/components/common/guide-panels';
import { ImageFallback } from '@/components/common/image-fallback';
import { siteConfig } from '@/data/site';
import { getDictionary } from '@/lib/dictionaries';
import { createPageMetadata } from '@/lib/metadata';
import { type Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return createPageMetadata({
    locale,
    path: 'guide-pratique',
    title: dict.guide.meta.title,
    description: dict.guide.meta.description,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const guide = dict.guide;

  return (
    <>
      <section className="relative overflow-hidden bg-taupe-900 py-20 text-cream-50">
        <div className="absolute inset-0">
          <ImageFallback src="/images/home/6.avif" alt={guide.hero.title} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,34,29,0.35),rgba(45,34,29,0.85))]" />
        </div>
        <div className="section-shell relative z-10">
          <p className="eyebrow-chip border-white/16 bg-white/8 text-cream-100">{guide.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-7xl">{guide.hero.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-100/84">{guide.hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.whatsapp.default} variant="whatsapp" external icon={<WhatsAppIcon className="h-4 w-4" />}>
              WhatsApp
            </ButtonLink>
            <ButtonLink href={`/${locale}/contact`} variant="secondary" className="border-white/16 bg-white/10 text-white">
              Besoin d’aide ?
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell-wide">
          <GuidePanels
            overviewTitle="Une page pensée pour être lue vite"
            overviewText="Arrivée, départ, chauffage, télévision, tri, parking et aide sur place : l’essentiel est regroupé ici pour trouver l’information utile sans faire défiler de longs blocs."
            quickFacts={guide.quickFacts}
            sections={guide.sections}
            faq={guide.faq}
            faqTitle={guide.faqTitle}
            faqEyebrow={guide.faqEyebrow}
          />
        </div>
      </section>

      <section className="section-space section-tint-soft">
        <div className="section-shell-wide">
          <div className="surface-card-strong flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="font-display text-4xl text-taupe-900">Besoin d’un coup de main avant votre arrivée ?</p>
              <p className="mt-3 max-w-2xl text-base leading-8 text-taupe-500">Une question pratique, un doute sur les horaires ou une demande spéciale ? WhatsApp reste le canal le plus simple.</p>
            </div>
            <ButtonLink href={siteConfig.whatsapp.default} variant="whatsapp" external icon={<WhatsAppIcon className="h-4 w-4" />}>
              WhatsApp
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
              Besoin d’aide ?
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

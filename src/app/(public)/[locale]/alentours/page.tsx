import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import { RecommendationCard } from '@/components/around/recommendation-card';
import { ButtonLink } from '@/components/common/button-link';
import { ImageFallback } from '@/components/common/image-fallback';
import { SectionHeading } from '@/components/common/section-heading';
import { StayIdeasSection } from '@/components/common/stay-ideas-section';
import { getAroundRecommendation } from '@/data/around-recommendations';
import { getSiteImages, resolveAroundImage } from '@/lib/content-store';
import { getDictionary, type SiteDictionary } from '@/lib/dictionaries';
import { createPageMetadata } from '@/lib/metadata';
import { getBookingPath, type Locale } from '@/lib/i18n';

type AroundSection = SiteDictionary['around']['sections'][number];
type AroundItem = AroundSection['items'][number];

const sectionAnchors: Record<string, string> = {
  restaurants: 'restaurants',
  walks: 'promenades',
  activities: 'activites-beau-temps',
  romantic: 'activites-romantiques',
  rainy: 'pluie',
  villages: 'villages-patrimoine',
  cycling: 'velo',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return createPageMetadata({
    locale,
    path: 'alentours',
    title: dict.around.meta.title,
    description: dict.around.meta.description,
    image: 'https://bergerie-brassine.com/images/around/redu.jpg',
  });
}

export default async function AroundPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const around = dict.around;
  const images = await getSiteImages();

  return (
    <>
      <section className="relative overflow-hidden bg-taupe-900 py-20 text-cream-50">
        <div className="absolute inset-0">
          <ImageFallback src={images.around.heroImage} alt={around.hero.title} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,34,29,0.25),rgba(45,34,29,0.82))]" />
        </div>
        <div className="section-shell relative z-10">
          <p className="text-xs uppercase tracking-[0.35em] text-cream-100/85">{around.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-7xl">{around.hero.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-100/84">{around.hero.description}</p>
        </div>
      </section>

      <StayIdeasSection locale={locale} compact />

      <section className="section-space">
        <div className="section-shell">
          <SectionHeading eyebrow={around.intro.eyebrow} title={around.intro.title} description={around.intro.text} />
          <div className="mt-10 grid gap-8">
            {around.sections.map((section: AroundSection) => (
              <details id={sectionAnchors[section.key] ?? section.key} key={section.key} className="surface-card group scroll-mt-28 overflow-hidden" open={section.key === around.sections[0]?.key}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 md:p-8">
                  <div className="max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.35em] text-wood">{section.eyebrow}</p>
                    <h2 className="mt-3 font-display text-4xl text-taupe-900">{section.title}</h2>
                  </div>
                  <span className="inline-flex rounded-full border border-taupe-100 bg-white/80 p-3 text-taupe-700 transition group-open:rotate-180">
                    <ChevronDown size={18} />
                  </span>
                </summary>
                <div className="px-6 pb-6 md:px-8 md:pb-8">
                  <p className="max-w-2xl text-base leading-8 text-taupe-500">{section.intro}</p>
                  <div className="mt-8 grid gap-4 lg:grid-cols-2">
                    {section.items.map((item: AroundItem) => {
                      const imageSrc = item.image ?? resolveAroundImage(images, section.key, item.name);
                      const recommendation = getAroundRecommendation(section.key, item.name);

                      return (
                        <RecommendationCard
                          key={item.name}
                          item={item}
                          sectionKey={section.key}
                          imageSrc={imageSrc}
                          recommendation={recommendation}
                          locale={locale}
                        />
                      );
                    })}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell">
          <div className="surface-card grid gap-5 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
            <div>
              <p className="font-display text-4xl text-taupe-900">{around.finalCta.title}</p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-taupe-500">{around.finalCta.text}</p>
            </div>
            <div className="grid gap-3">
              <ButtonLink href={getBookingPath(locale)}>{around.finalCta.primary}</ButtonLink>
              <ButtonLink href={`/${locale}/guide-pratique`} variant="secondary">
                {around.finalCta.secondary}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

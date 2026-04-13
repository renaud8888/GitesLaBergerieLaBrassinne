import type { Metadata } from 'next';

import { FaqAccordion } from '@/components/common/faq-accordion';
import { ImageFallback } from '@/components/common/image-fallback';
import { SectionHeading } from '@/components/common/section-heading';
import { getDictionary, type SiteDictionary } from '@/lib/dictionaries';
import { createPageMetadata } from '@/lib/metadata';
import { type Locale } from '@/lib/i18n';

type GuideSection = SiteDictionary['guide']['sections'][number];
type GuidePoint = NonNullable<GuideSection['points']>[number];
type GuideQuickFact = SiteDictionary['guide']['quickFacts'][number];

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
          <p className="text-xs uppercase tracking-[0.35em] text-cream-100/85">{guide.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-7xl">{guide.hero.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-100/84">{guide.hero.description}</p>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {guide.quickFacts.map((fact: GuideQuickFact) => (
              <article key={fact.title} className="surface-card p-6">
                <p className="font-display text-3xl text-taupe-900">{fact.title}</p>
                <p className="mt-3 text-sm leading-7 text-taupe-500">{fact.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell grid gap-8">
          {guide.sections.map((section: GuideSection) => (
            <section key={section.title} className="surface-card p-6 md:p-8">
              <SectionHeading eyebrow={section.eyebrow} title={section.title} description={section.text} />
              {section.points?.length ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {section.points.map((point: GuidePoint) => (
                    <article key={point.title} className="rounded-[1.4rem] bg-white p-5">
                      <p className="font-display text-2xl text-taupe-900">{point.title}</p>
                      <p className="mt-3 text-sm leading-7 text-taupe-500">{point.text}</p>
                    </article>
                  ))}
                </div>
              ) : null}
              {section.bullets?.length ? (
                <ul className="mt-6 grid gap-2 text-sm leading-7 text-taupe-500">
                  {section.bullets.map((bullet: string) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </section>

      <section className="section-space bg-white/35">
        <div className="section-shell">
          <SectionHeading eyebrow={guide.faqEyebrow} title={guide.faqTitle} description={guide.faqDescription} />
          <div className="mt-8">
            <FaqAccordion items={guide.faq} />
          </div>
        </div>
      </section>
    </>
  );
}

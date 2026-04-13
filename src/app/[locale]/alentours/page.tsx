import type { Metadata } from 'next';
import { ButtonLink } from '@/components/common/button-link';
import { ImageFallback } from '@/components/common/image-fallback';
import { SectionHeading } from '@/components/common/section-heading';
import { aroundSectionImages } from '@/data/site';
import { getDictionary, type SiteDictionary } from '@/lib/dictionaries';
import { createPageMetadata } from '@/lib/metadata';
import { type Locale } from '@/lib/i18n';

type AroundSection = SiteDictionary['around']['sections'][number];
type AroundItem = AroundSection['items'][number];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return createPageMetadata({
    locale,
    path: 'alentours',
    title: dict.around.meta.title,
    description: dict.around.meta.description,
  });
}

export default async function AroundPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const around = dict.around;

  return (
    <>
      <section className="relative overflow-hidden bg-taupe-900 py-20 text-cream-50">
        <div className="absolute inset-0">
          <ImageFallback src="/images/around/mirwart.jpg" alt={around.hero.title} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,34,29,0.25),rgba(45,34,29,0.82))]" />
        </div>
        <div className="section-shell relative z-10">
          <p className="text-xs uppercase tracking-[0.35em] text-cream-100/85">{around.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-7xl">{around.hero.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-100/84">{around.hero.description}</p>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <SectionHeading eyebrow={around.intro.eyebrow} title={around.intro.title} description={around.intro.text} />
          <div className="mt-10 grid gap-8">
            {around.sections.map((section: AroundSection) => (
              <section key={section.key} className="surface-card p-6 md:p-8">
                <div className="max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-wood">{section.eyebrow}</p>
                  <h2 className="mt-3 font-display text-4xl text-taupe-900">{section.title}</h2>
                  <p className="mt-4 text-base leading-8 text-taupe-500">{section.intro}</p>
                </div>
                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                  {section.items.map((item: AroundItem) => (
                    <article key={item.name} className="overflow-hidden rounded-[1.5rem] border border-taupe-100 bg-white">
                      <div className="relative aspect-[16/10]">
                        <ImageFallback
                          src={aroundSectionImages[section.key as keyof typeof aroundSectionImages]}
                          alt={item.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                      <div className="p-5">
                        <div>
                          <p className="font-display text-3xl text-taupe-900">{item.name}</p>
                          <p className="mt-1 text-sm uppercase tracking-[0.18em] text-wood">
                            {[
                              'location' in item ? item.location : undefined,
                              'distance' in item ? item.distance : undefined,
                            ]
                              .filter(Boolean)
                              .join(' - ')}
                          </p>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-taupe-500">{item.description}</p>
                        {item.tags?.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.map((tag: string) => (
                              <span key={tag} className="rounded-full bg-cream-100 px-3 py-1 text-xs uppercase tracking-[0.15em] text-taupe-500">
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
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
              <ButtonLink href={`/${locale}/contact`}>{around.finalCta.primary}</ButtonLink>
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

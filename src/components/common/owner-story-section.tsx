import { Heart, Paintbrush, Sparkles } from 'lucide-react';

import { ImageFallback } from '@/components/common/image-fallback';
import { ownerStoryContent, ownerStoryImage } from '@/data/owner-story';
import type { Locale } from '@/lib/i18n';

type OwnerStorySectionProps = {
  locale: Locale;
  compact?: boolean;
};

export function OwnerStorySection({ locale, compact = false }: OwnerStorySectionProps) {
  const content = ownerStoryContent[locale];
  const hasImage = Boolean(ownerStoryImage.src);

  if (compact) {
    return (
      <div className="surface-card-strong p-5 md:p-6">
        <div className="flex items-start gap-3">
          <span className="inline-flex rounded-full bg-rose-100 p-3 text-taupe-700">
            <Heart size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-3xl leading-none text-taupe-900">{content.shortTitle}</p>
            <p className="mt-3 text-sm leading-7 text-taupe-500">{content.compactText}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="section-space bg-white/35">
      <div className="section-shell">
        <div className="surface-card-strong grid gap-6 overflow-hidden p-6 md:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          {hasImage ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-cream-100">
              <ImageFallback src={ownerStoryImage.src} alt={content.imageAlt} fill sizes="(max-width: 1024px) 100vw, 42vw" />
            </div>
          ) : null}
          <div className={hasImage ? '' : 'max-w-3xl'}>
            <p className="eyebrow-chip bg-rose-100 text-taupe-700">{content.badge}</p>
            <h2 className="mt-4 font-display text-4xl leading-none text-taupe-900 md:text-5xl">{content.title}</h2>
            <p className="mt-5 text-base leading-8 text-taupe-500">{content.text}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-taupe-700">
              <span className="inline-flex items-center gap-2 rounded-full border border-taupe-100 bg-white/82 px-4 py-2">
                <Paintbrush size={15} className="text-wood" aria-hidden="true" />
                {content.detail}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-taupe-100 bg-white/82 px-4 py-2">
                <Sparkles size={15} className="text-wood" aria-hidden="true" />
                {content.badge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

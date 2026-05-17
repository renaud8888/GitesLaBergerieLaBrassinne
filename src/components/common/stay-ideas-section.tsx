import { Heart, Leaf, Sparkles, Umbrella, type LucideIcon } from 'lucide-react';

import { ButtonLink } from '@/components/common/button-link';
import { getStayIdeas, stayIdeasContent } from '@/data/stay-ideas';
import type { Locale } from '@/lib/i18n';

const iconByIdea: Record<string, LucideIcon> = {
  'romantic-weekend': Heart,
  'nature-weekend': Leaf,
  'rainy-cocooning-weekend': Umbrella,
  'ardenne-discovery-weekend': Sparkles,
};

export function StayIdeasSection({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const content = stayIdeasContent[locale];
  const ideas = getStayIdeas(locale);

  return (
    <section className={compact ? 'section-space pt-0' : 'section-space bg-white/35'}>
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-wood">{content.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl leading-none text-taupe-900 md:text-5xl">{content.title}</h2>
          <p className="mt-5 text-base leading-8 text-taupe-500">{content.description}</p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {ideas.map((idea) => {
            const Icon = iconByIdea[idea.id] ?? Sparkles;

            return (
              <article key={idea.id} className="surface-card-strong flex flex-col p-6">
                <div className="inline-flex w-fit rounded-full bg-rose-100 p-3 text-taupe-700">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-3xl leading-none text-taupe-900">{idea.title}</h3>
                <p className="mt-3 text-sm leading-7 text-taupe-500">{idea.description}</p>
                <ul className="mt-5 grid gap-2 text-sm leading-6 text-taupe-700">
                  {idea.ideas.map((item) => (
                    <li key={item} className="flex gap-3 rounded-[1rem] bg-cream-50/70 px-3 py-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {idea.ctas.map((cta, index) => (
                    <ButtonLink key={cta.href} href={cta.href} variant={index === 0 ? 'primary' : 'secondary'} className="w-full justify-center md:w-fit">
                      {cta.label}
                    </ButtonLink>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

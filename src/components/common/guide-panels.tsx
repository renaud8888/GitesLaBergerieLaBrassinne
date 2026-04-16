'use client';

import { ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';

import { FaqAccordion } from '@/components/common/faq-accordion';
import { cn } from '@/lib/utils';

type GuidePanelsProps = {
  overviewTitle: string;
  overviewText: string;
  quickFacts: Array<{ title: string; text: string }>;
  sections: Array<{
    title: string;
    eyebrow: string;
    text: string;
    points?: Array<{ title: string; text: string }>;
    bullets?: string[];
  }>;
  faq: Array<{ question: string; answer: string }>;
  faqTitle: string;
  faqEyebrow: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function GuidePanels({ overviewTitle, overviewText, quickFacts, sections, faq, faqTitle, faqEyebrow }: GuidePanelsProps) {
  const items = useMemo(
    () => [
      { id: 'overview', title: 'En un coup d’œil', eyebrow: 'Essentiel' },
      ...sections.map((section) => ({ id: slugify(section.title), title: section.title, eyebrow: section.eyebrow })),
      { id: 'faq', title: faqTitle, eyebrow: faqEyebrow },
    ],
    [faqEyebrow, faqTitle, sections],
  );

  const [openId, setOpenId] = useState('overview');

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="surface-card-strong overflow-hidden p-3">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:gap-2 lg:overflow-visible">
            {items.map((item) => {
              const isActive = openId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOpenId(item.id)}
                  className={cn(
                    'min-w-max rounded-[1.2rem] border px-4 py-3 text-left transition lg:min-w-0',
                    isActive
                      ? 'border-taupe-800 bg-taupe-800 text-cream-50'
                      : 'border-white/70 bg-white/80 text-taupe-700 hover:bg-white',
                  )}
                >
                  <span className={cn('block text-[11px] uppercase tracking-[0.22em]', isActive ? 'text-cream-100/70' : 'text-wood')}>
                    {item.eyebrow}
                  </span>
                  <span className="mt-1 block text-sm font-medium">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="grid gap-4">
        <section id="overview" className="surface-card-strong overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenId((current) => (current === 'overview' ? '' : 'overview'))}
            className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-8"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-wood">Essentiel</p>
              <p className="mt-2 font-display text-3xl text-taupe-900 md:text-4xl">{overviewTitle}</p>
            </div>
            <span className="rounded-full border border-taupe-100 bg-white p-2 shadow-[0_10px_24px_rgba(89,63,49,0.08)]">
              <ChevronDown className={cn('transition-transform', openId === 'overview' && 'rotate-180')} size={18} />
            </span>
          </button>
          <div className={cn('px-5 pb-5 md:px-8 md:pb-8', openId !== 'overview' && 'hidden')}>
            <div>
              <p className="max-w-2xl text-base leading-8 text-taupe-500">{overviewText}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {quickFacts.map((fact) => (
                  <article key={fact.title} className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-wood">{fact.title}</p>
                    <p className="mt-3 font-display text-3xl text-taupe-900">{fact.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {sections.map((section) => {
          const id = slugify(section.title);
          const isOpen = openId === id;

          return (
            <section id={id} key={section.title} className="surface-card-strong overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenId((current) => (current === id ? '' : id))}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-8"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-wood">{section.eyebrow}</p>
                  <p className="mt-2 font-display text-3xl text-taupe-900 md:text-4xl">{section.title}</p>
                </div>
                <span className="rounded-full border border-taupe-100 bg-white p-2 shadow-[0_10px_24px_rgba(89,63,49,0.08)]">
                  <ChevronDown className={cn('transition-transform', isOpen && 'rotate-180')} size={18} />
                </span>
              </button>

              <div className={cn('px-5 pb-5 md:px-8 md:pb-8', !isOpen && 'hidden')}>
                <div>
                  <p className="max-w-3xl text-base leading-8 text-taupe-500">{section.text}</p>
                  {section.points?.length ? (
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      {section.points.map((point) => (
                        <article key={point.title} className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5">
                          <p className="font-display text-2xl text-taupe-900">{point.title}</p>
                          <p className="mt-3 text-sm leading-7 text-taupe-500">{point.text}</p>
                        </article>
                      ))}
                    </div>
                  ) : null}
                  {section.bullets?.length ? (
                    <ul className="mt-6 grid gap-3 text-sm leading-7 text-taupe-500">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="inline-flex gap-2 rounded-[1.25rem] border border-white/70 bg-white/80 px-4 py-3">
                          <span className="mt-[0.6rem] h-1.5 w-1.5 rounded-full bg-rose-300" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </section>
          );
        })}

        <section id="faq" className="surface-card-strong overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenId((current) => (current === 'faq' ? '' : 'faq'))}
            className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-8"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-wood">{faqEyebrow}</p>
              <p className="mt-2 font-display text-3xl text-taupe-900 md:text-4xl">{faqTitle}</p>
            </div>
            <span className="rounded-full border border-taupe-100 bg-white p-2 shadow-[0_10px_24px_rgba(89,63,49,0.08)]">
              <ChevronDown className={cn('transition-transform', openId === 'faq' && 'rotate-180')} size={18} />
            </span>
          </button>
          <div className={cn('px-3 pb-3 md:px-4 md:pb-4', openId !== 'faq' && 'hidden')}>
            <div>
              <FaqAccordion items={faq} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

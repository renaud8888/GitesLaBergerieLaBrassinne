'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type FaqAccordionProps = {
  items: Array<{ question: string; answer: string }>;
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="surface-card-strong divide-y divide-taupe-100/80 overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-white/40 md:px-8"
            >
              <span className="font-display text-[1.8rem] leading-tight text-taupe-900">{item.question}</span>
              <span className="rounded-full border border-taupe-100 bg-white p-2 shadow-[0_10px_24px_rgba(89,63,49,0.08)]">
                <ChevronDown className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'} size={18} />
              </span>
            </button>
            <div className={isOpen ? 'grid grid-rows-[1fr]' : 'grid grid-rows-[0fr]'}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-7 text-taupe-500 md:px-8 md:text-base">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

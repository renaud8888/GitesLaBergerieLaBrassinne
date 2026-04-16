'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ImageFallback } from '@/components/common/image-fallback';
import { cn } from '@/lib/utils';

export function StackedGallery({ images }: { images: Array<{ src: string; alt: string }> }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="relative h-[380px] md:h-[520px]">
        {images.map((image, imageIndex) => {
          const offset = (imageIndex - index + images.length) % images.length;
          const visibleOffset = offset > images.length / 2 ? offset - images.length : offset;

          return (
            <div
              key={image.src}
              className={cn(
                'absolute inset-0 mx-auto w-[78%] origin-left overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_30px_90px_rgba(89,63,49,0.16)] transition-all duration-500',
                visibleOffset === 0 && 'z-30 rotate-0 translate-x-0 scale-100',
                visibleOffset === 1 && 'z-20 translate-x-[10%] rotate-[4deg] scale-[0.95] opacity-90',
                visibleOffset === 2 && 'z-10 translate-x-[16%] rotate-[7deg] scale-[0.91] opacity-70',
                visibleOffset === -1 && 'z-20 -translate-x-[8%] -rotate-[4deg] scale-[0.95] opacity-90',
                Math.abs(visibleOffset) > 2 && 'pointer-events-none scale-[0.88] opacity-0',
              )}
            >
              <div className="relative h-full">
                <ImageFallback src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 90vw, 960px" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-6 py-8 text-white">
                  <p className="font-display text-3xl md:text-4xl">{image.alt}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.28em] text-taupe-500">
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={() => setIndex((current) => (current - 1 + images.length) % images.length)} className="rounded-full border border-taupe-200 bg-white p-3 text-taupe-900 shadow-[0_12px_24px_rgba(89,63,49,0.08)]">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => setIndex((current) => (current + 1) % images.length)} className="rounded-full border border-taupe-200 bg-white p-3 text-taupe-900 shadow-[0_12px_24px_rgba(89,63,49,0.08)]">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

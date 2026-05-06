'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ImageFallback } from '@/components/common/image-fallback';
import { cn } from '@/lib/utils';

export function StackedGallery({ images }: { images: Array<{ src: string; alt: string }> }) {
  const [index, setIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);

  const showPrevious = () => setIndex((current) => (current - 1 + images.length) % images.length);
  const showNext = () => setIndex((current) => (current + 1) % images.length);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    pointerStartX.current = event.clientX;
    pointerStartY.current = event.clientY;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null || pointerStartY.current === null) {
      return;
    }

    const deltaX = event.clientX - pointerStartX.current;
    const deltaY = event.clientY - pointerStartY.current;
    pointerStartX.current = null;
    pointerStartY.current = null;

    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      showNext();
    } else {
      showPrevious();
    }
  }

  return (
    <div className="relative mx-auto max-w-5xl">
      <div
        className="relative h-[380px] touch-pan-y select-none md:h-[520px]"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStartX.current = null;
          pointerStartY.current = null;
        }}
      >
        {images.map((image, imageIndex) => {
          const offset = (imageIndex - index + images.length) % images.length;
          const visibleOffset = offset > images.length / 2 ? offset - images.length : offset;

          return (
            <div
              key={image.src}
              className={cn(
                'absolute inset-0 mx-auto w-[78%] origin-left overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_30px_90px_rgba(89,63,49,0.16)] transition-all duration-500',
                visibleOffset === 0 && 'z-30 cursor-grab rotate-0 translate-x-0 scale-100 active:cursor-grabbing',
                visibleOffset === 1 && 'z-20 translate-x-[10%] rotate-[4deg] scale-[0.95] cursor-pointer opacity-90',
                visibleOffset === 2 && 'z-10 translate-x-[16%] rotate-[7deg] scale-[0.91] opacity-70',
                visibleOffset === -1 && 'z-20 -translate-x-[8%] -rotate-[4deg] scale-[0.95] cursor-pointer opacity-90',
                Math.abs(visibleOffset) > 2 && 'pointer-events-none scale-[0.88] opacity-0',
              )}
              onClick={() => {
                if (visibleOffset === 1) {
                  showNext();
                }

                if (visibleOffset === -1) {
                  showPrevious();
                }
              }}
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
        <button
          type="button"
          onClick={showPrevious}
          className="absolute left-2 top-1/2 z-40 -translate-y-1/2 rounded-full border border-white/70 bg-white/88 p-3 text-taupe-900 shadow-[0_16px_34px_rgba(89,63,49,0.16)] backdrop-blur transition hover:bg-white md:left-6"
          aria-label="Photo précédente"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={showNext}
          className="absolute right-2 top-1/2 z-40 -translate-y-1/2 rounded-full border border-white/70 bg-white/88 p-3 text-taupe-900 shadow-[0_16px_34px_rgba(89,63,49,0.16)] backdrop-blur transition hover:bg-white md:right-6"
          aria-label="Photo suivante"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.28em] text-taupe-500">
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </p>
        <div className="flex max-w-[68%] flex-wrap justify-end gap-2">
          {images.map((image, imageIndex) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(imageIndex)}
              className={cn(
                'h-2.5 rounded-full transition-all',
                imageIndex === index ? 'w-8 bg-taupe-900' : 'w-2.5 bg-taupe-200 hover:bg-taupe-300',
              )}
              aria-label={`Photo ${imageIndex + 1}`}
              aria-current={imageIndex === index ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

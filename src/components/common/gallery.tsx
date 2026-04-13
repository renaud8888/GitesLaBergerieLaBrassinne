'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { ImageFallback } from '@/components/common/image-fallback';

type GalleryProps = {
  images: Array<{ src: string; alt: string }>;
  previewCount?: number;
};

export function Gallery({ images, previewCount = 8 }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const previewImages = images.slice(0, previewCount);
  const remaining = Math.max(images.length - previewImages.length, 0);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (activeIndex === null) return;
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((current) => (current === null ? null : (current + 1) % images.length));
      if (event.key === 'ArrowLeft') setActiveIndex((current) => (current === null ? null : (current - 1 + images.length) % images.length));
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, images.length]);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {previewImages.map((image, index) => {
          const isLastVisible = index === previewImages.length - 1 && remaining > 0;

          return (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-[1.4rem] border border-white/60 bg-white/60 text-left shadow-[0_10px_30px_rgba(89,63,49,0.08)]"
          >
            <div className="relative aspect-[4/3]">
              <ImageFallback
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            {isLastVisible ? (
              <div className="absolute inset-0 flex items-center justify-center bg-taupe-900/42 text-white">
                <div className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold tracking-[0.14em]">
                  +{remaining}
                </div>
              </div>
            ) : null}
          </button>
        )})}
      </div>

      <AnimatePresence>
        {activeIndex !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-taupe-900/90 p-4 backdrop-blur-md"
            onClick={() => setActiveIndex(null)}
          >
            <div className="flex h-full items-center justify-center">
              <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="absolute -top-14 right-0 rounded-full bg-white/10 p-3 text-white"
                  aria-label="Close gallery"
                >
                  <X size={20} />
                </button>
                <div className="relative aspect-[3/2] overflow-hidden rounded-[1.8rem]">
                  <ImageFallback src={images[activeIndex].src} alt={images[activeIndex].alt} fill priority sizes="90vw" />
                </div>
                <div className="mt-4 flex items-center justify-between gap-4 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/70">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
                      className="rounded-full bg-white/10 p-3"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
                      className="rounded-full bg-white/10 p-3"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

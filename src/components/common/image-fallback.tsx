'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type ImageFallbackProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function ImageFallback({
  src,
  alt,
  fill,
  width,
  height,
  priority,
  className,
  sizes,
}: ImageFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn(
          'flex h-full min-h-[220px] w-full items-center justify-center rounded-[inherit] border border-dashed border-taupe-200 bg-gradient-to-br from-cream-100 to-rose-100 p-6 text-center',
          className,
        )}
      >
        <div>
          <p className="font-display text-2xl text-taupe-700">Photo à ajouter</p>
          <p className="mt-2 text-sm text-taupe-500">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={cn('h-full w-full object-cover', className)}
      onError={() => setHasError(true)}
    />
  );
}

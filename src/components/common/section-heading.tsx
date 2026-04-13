import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow ? (
        <p className={cn('eyebrow-chip mb-4', light && 'border-white/20 bg-white/8 text-cream-100')}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn('font-display text-[2.6rem] leading-[0.92] md:text-[3.7rem]', light ? 'text-cream-50' : 'text-taupe-900')}>
        {title}
      </h2>
      {description ? (
        <p className={cn('mt-5 text-base leading-8 md:text-[1.08rem]', light ? 'text-cream-100/85' : 'text-taupe-500')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

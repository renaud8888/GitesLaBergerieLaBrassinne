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
        <p className={cn('mb-3 text-xs uppercase tracking-[0.35em]', light ? 'text-cream-200' : 'text-wood')}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn('font-display text-4xl leading-none md:text-5xl', light ? 'text-cream-50' : 'text-taupe-900')}>
        {title}
      </h2>
      {description ? (
        <p className={cn('mt-4 text-base leading-8 md:text-lg', light ? 'text-cream-100/85' : 'text-taupe-500')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

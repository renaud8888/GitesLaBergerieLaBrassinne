import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'whatsapp';
  external?: boolean;
  className?: string;
  showArrow?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  external = false,
  className,
  showArrow = false,
  icon,
  iconPosition = 'left',
}: ButtonLinkProps) {
  const classes = cn(
    variant === 'primary' && 'button-primary',
    variant === 'secondary' && 'button-secondary',
    variant === 'whatsapp' && 'button-whatsapp',
    className,
  );

  const content = (
    <>
      {icon && iconPosition === 'left' ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === 'right' ? icon : null}
      {showArrow ? <ArrowRight size={16} /> : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

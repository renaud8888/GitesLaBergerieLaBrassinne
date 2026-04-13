'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ButtonLink } from '@/components/common/button-link';
import { localeLabels, locales, stripLocaleFromPath, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type HeaderProps = {
  locale: Locale;
  nav: {
    home: string;
    bergerie: string;
    brassine: string;
    around: string;
    guide: string;
    contact: string;
    reserve: string;
  };
};

const navItems = [
  { key: 'home', path: '' },
  { key: 'bergerie', path: '/gites/la-bergerie' },
  { key: 'brassine', path: '/gites/la-brassine' },
  { key: 'around', path: '/alentours' },
  { key: 'guide', path: '/guide-pratique' },
  { key: 'contact', path: '/contact' },
] as const;

export function Header({ locale, nav }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const normalized = stripLocaleFromPath(pathname);
  const immersive = normalized === '/' || normalized.startsWith('/gites') || normalized === '/guide-pratique' || normalized === '/contact';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const shellClass = immersive && !scrolled
    ? 'border-white/60 bg-[rgba(255,250,245,0.92)] shadow-[0_12px_34px_rgba(89,63,49,0.08)] md:border-white/10 md:bg-[linear-gradient(180deg,rgba(45,34,29,0.35),rgba(45,34,29,0.06))] md:shadow-none'
    : 'border-white/35 bg-[rgba(255,250,245,0.78)] shadow-[0_12px_34px_rgba(89,63,49,0.08)]';

  const brandCardClass = immersive && !scrolled
    ? 'border-white/60 bg-[rgba(255,250,245,0.94)] text-taupe-900 md:border-white/12 md:bg-white/8 md:text-cream-50'
    : 'border-white/50 bg-[rgba(255,250,245,0.72)] text-taupe-900';

  return (
    <header className={cn('sticky top-0 z-50 backdrop-blur-xl transition-all duration-300', shellClass)}>
      <div className="section-shell flex items-center justify-between py-4">
        <Link href={`/${locale}`} className={cn('min-w-0 rounded-[1.45rem] border px-4 py-3 transition-all', brandCardClass)}>
          <p className={cn('font-display text-2xl leading-none md:text-3xl', immersive && !scrolled ? 'text-taupe-900 md:text-cream-50' : 'text-taupe-900')}>
            La Bergerie & La Brassine
          </p>
          <p className={cn('mt-1 truncate text-[11px] uppercase tracking-[0.28em]', immersive && !scrolled ? 'text-taupe-500 md:text-cream-100/75' : 'text-taupe-500')}>
            Gîtes de charme à Libin
          </p>
        </Link>

        <nav className="hidden items-center gap-2 xl:flex">
          {navItems.map((item) => {
            const href = `/${locale}${item.path}`;
            const active = item.path === '' ? normalized === '/' : normalized === item.path || normalized.startsWith(item.path);

            return (
              <Link
                key={item.key}
                href={href}
                className={cn(
                  'rounded-full border px-4 py-2.5 text-sm shadow-[0_8px_24px_rgba(89,63,49,0.08)] transition',
                  active
                    ? 'border-rose-200 bg-[rgba(239,226,212,0.96)] text-taupe-900 shadow-[0_10px_24px_rgba(89,63,49,0.1)]'
                    : immersive && !scrolled
                      ? 'border-white/55 bg-[rgba(255,250,245,0.88)] text-taupe-900 hover:bg-white'
                      : 'border-white/60 bg-[rgba(255,250,245,0.88)] text-taupe-900 hover:bg-white',
                )}
              >
                {nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <div className={cn('flex items-center rounded-full border p-1 shadow-[0_8px_24px_rgba(89,63,49,0.08)]', immersive && !scrolled ? 'border-white/14 bg-white/8' : 'border-white/60 bg-[rgba(255,250,245,0.88)]')}>
            {locales.map((entry) => (
              <Link
                key={entry}
                href={`/${entry}${normalized === '/' ? '' : normalized}`}
                className={cn(
                  'rounded-full px-3 py-2 text-xs tracking-[0.2em] transition',
                  locale === entry
                    ? 'bg-[rgba(239,226,212,0.96)] text-taupe-900'
                    : immersive && !scrolled
                      ? 'text-taupe-700 hover:text-taupe-900'
                      : 'text-taupe-700',
                )}
              >
                {localeLabels[entry]}
              </Link>
            ))}
          </div>
          <ButtonLink href={`/${locale}/contact`}>{nav.reserve}</ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className={cn(
            'rounded-full border p-3 shadow-[0_8px_24px_rgba(89,63,49,0.08)] xl:hidden',
            immersive && !scrolled ? 'border-white/60 bg-[rgba(255,250,245,0.94)] text-taupe-900' : 'border-white/60 bg-[rgba(255,250,245,0.88)] text-taupe-900',
          )}
          aria-label="Open menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div className={cn('fixed inset-0 z-[70] transition xl:hidden', open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0')}>
        <div className="absolute inset-0 bg-[rgba(255,250,245,0.98)] backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div className={cn('absolute inset-0 flex flex-col bg-[linear-gradient(180deg,#fffaf5,#f4e8dc)] px-5 pb-8 pt-5 text-taupe-900 transition-transform', open ? 'translate-x-0' : 'translate-x-full')}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-4xl leading-none">La Bergerie & La Brassine</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-taupe-500">Gîtes de charme à Libin</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-taupe-200 bg-white/92 p-3 shadow-[0_10px_24px_rgba(89,63,49,0.08)]">
              <X size={18} />
            </button>
          </div>

          <div className="mt-8 grid gap-3">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.path}`}
                className={cn(
                  'rounded-[1.35rem] border px-5 py-4 text-base font-medium shadow-[0_12px_24px_rgba(89,63,49,0.06)] transition',
                  (item.path === '' ? normalized === '/' : normalized === item.path || normalized.startsWith(item.path))
                    ? 'border-rose-200 bg-[rgba(239,226,212,0.96)] text-taupe-900'
                    : 'border-white/80 bg-white/90 text-taupe-900'
                )}
                onClick={() => setOpen(false)}
              >
                {nav[item.key]}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex gap-2">
            {locales.map((entry) => (
              <Link
                key={entry}
                href={`/${entry}${normalized === '/' ? '' : normalized}`}
                className={cn('rounded-full px-4 py-2 text-xs tracking-[0.2em]', locale === entry ? 'bg-[rgba(239,226,212,0.96)] text-taupe-900' : 'border border-taupe-200 bg-white/92 text-taupe-700')}
              >
                {localeLabels[entry]}
              </Link>
            ))}
          </div>

          <ButtonLink href={`/${locale}/contact`} className="mt-auto w-full justify-center">
            {nav.reserve}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

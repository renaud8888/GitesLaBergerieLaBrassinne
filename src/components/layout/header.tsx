'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { ButtonLink } from '@/components/common/button-link';
import { localeLabels, locales, stripLocaleFromPath, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type HeaderProps = {
  locale: Locale;
  brand: {
    name: string;
    tagline: string;
  };
  menuAriaLabel: string;
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

export function Header({ locale, nav, brand, menuAriaLabel }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const shellClass = immersive && !scrolled
    ? 'border-white/60 bg-[rgba(255,250,245,0.94)] shadow-[0_12px_34px_rgba(89,63,49,0.08)] md:border-white/14 md:bg-[linear-gradient(180deg,rgba(45,34,29,0.56),rgba(45,34,29,0.14))] md:shadow-none'
    : 'border-white/35 bg-[rgba(255,250,245,0.78)] shadow-[0_12px_34px_rgba(89,63,49,0.08)]';

  const brandCardClass = immersive && !scrolled
    ? 'border-white/60 bg-[rgba(255,250,245,0.95)] text-taupe-900 shadow-[0_10px_28px_rgba(89,63,49,0.08)] md:border-white/18 md:bg-[rgba(255,250,245,0.16)] md:text-cream-50 md:shadow-[0_18px_36px_rgba(18,12,10,0.12)]'
    : 'border-white/50 bg-[rgba(255,250,245,0.72)] text-taupe-900';

  return (
    <header className={cn('sticky top-0 z-50 backdrop-blur-xl transition-all duration-300', shellClass)}>
      <div className="section-shell flex items-center justify-between py-4">
        <Link href={`/${locale}`} className={cn('min-w-0 rounded-[1.45rem] border px-4 py-3 transition-all', brandCardClass)}>
          <p className={cn('font-display text-2xl leading-none md:text-3xl', immersive && !scrolled ? 'text-taupe-900 md:text-cream-50' : 'text-taupe-900')}>
            {brand.name}
          </p>
          <p className={cn('mt-1 truncate text-[11px] uppercase tracking-[0.28em]', immersive && !scrolled ? 'text-taupe-500 md:text-cream-100/75' : 'text-taupe-500')}>
            {brand.tagline}
          </p>
        </Link>

        <nav className="hidden flex-nowrap items-center gap-1.5 xl:flex">
          {navItems.map((item) => {
            const href = `/${locale}${item.path}`;
            const active = item.path === '' ? normalized === '/' : normalized === item.path || normalized.startsWith(item.path);

            return (
              <Link
                key={item.key}
                href={href}
                className={cn(
                  'whitespace-nowrap rounded-full border px-3.5 py-2.5 text-sm shadow-[0_8px_24px_rgba(89,63,49,0.08)] transition',
                  active
                    ? 'border-rose-200 bg-[rgba(239,226,212,0.96)] text-taupe-900 shadow-[0_10px_24px_rgba(89,63,49,0.1)]'
                    : immersive && !scrolled
                      ? 'border-white/40 bg-[rgba(255,250,245,0.2)] text-cream-50 hover:bg-[rgba(255,250,245,0.28)]'
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
                      ? 'text-cream-100/84 hover:text-cream-50'
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
          aria-label={menuAriaLabel}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mounted
        ? createPortal(
            <div className={cn('fixed inset-0 z-[70] transition xl:hidden', open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0')}>
              <div className="absolute inset-0 bg-taupe-900/40 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
              <div
                className={cn(
                  'absolute right-0 top-0 isolate flex h-dvh min-h-screen w-[82vw] max-w-sm flex-col overflow-hidden border-l border-[#ead8cb] bg-[#f6eee6] px-5 pb-8 pt-5 text-taupe-900 shadow-[0_30px_90px_rgba(0,0,0,0.22)] transition-transform',
                  open ? 'translate-x-0' : 'translate-x-full',
                )}
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fbf6f1_0%,#f3e4d8_100%)]" />
                <div className="flex items-start justify-between gap-4">
                  <div className="relative z-10">
                    <p className="font-display text-4xl leading-none">{brand.name}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-taupe-500">{brand.tagline}</p>
                  </div>
                  <button type="button" onClick={() => setOpen(false)} className="relative z-10 rounded-full border border-taupe-200 bg-[#fffaf5] p-3 shadow-[0_10px_24px_rgba(89,63,49,0.08)] transition hover:bg-cream-50">
                    <X size={18} />
                  </button>
                </div>

                <div className="relative z-10 mt-8 grid gap-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      href={`/${locale}${item.path}`}
                      className={cn(
                        'rounded-[1.35rem] border px-5 py-4 text-base font-medium shadow-[0_12px_24px_rgba(89,63,49,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(89,63,49,0.1)]',
                        (item.path === '' ? normalized === '/' : normalized === item.path || normalized.startsWith(item.path))
                          ? 'border-rose-200 bg-[linear-gradient(135deg,#f2dfd7,#efe2d4)] text-taupe-900'
                          : 'border-white/70 bg-white/96 text-taupe-900',
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {nav[item.key]}
                    </Link>
                  ))}
                </div>

                <div className="relative z-10 mt-8 flex gap-2">
                  {locales.map((entry) => (
                    <Link
                      key={entry}
                      href={`/${entry}${normalized === '/' ? '' : normalized}`}
                      className={cn('rounded-full px-4 py-2 text-xs tracking-[0.2em] transition', locale === entry ? 'bg-[#efe2d4] text-taupe-900' : 'border border-taupe-200 bg-white text-taupe-700 hover:bg-cream-50')}
                    >
                      {localeLabels[entry]}
                    </Link>
                  ))}
                </div>

                <ButtonLink href={`/${locale}/contact`} className="relative z-10 mt-auto w-full justify-center bg-[linear-gradient(135deg,#f4d8d2,#eec3be)] text-taupe-900 shadow-[0_24px_40px_rgba(240,201,198,0.34)]">
                  {nav.reserve}
                </ButtonLink>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}

'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
  const normalized = stripLocaleFromPath(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-white/35 bg-[rgba(255,250,245,0.68)] backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <Link href={`/${locale}`} className="min-w-0 rounded-[1.4rem] border border-white/50 bg-[rgba(255,250,245,0.72)] px-4 py-3 shadow-[0_10px_30px_rgba(89,63,49,0.08)]">
          <p className="font-display text-2xl leading-none text-taupe-900 md:text-3xl">La Bergerie & La Brassine</p>
          <p className="mt-1 truncate text-[11px] uppercase tracking-[0.28em] text-taupe-500">Gites de charme a Libin</p>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const href = `/${locale}${item.path}`;
            const active = item.path === '' ? normalized === '/' : normalized === item.path || normalized.startsWith(item.path);

            return (
              <Link
                key={item.key}
                href={href}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm shadow-[0_8px_24px_rgba(89,63,49,0.08)] transition',
                  active
                    ? 'border-taupe-700 bg-taupe-700 text-cream-50'
                    : 'border-white/60 bg-[rgba(255,250,245,0.88)] text-taupe-900 hover:bg-white',
                )}
              >
                {nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex items-center rounded-full border border-white/60 bg-[rgba(255,250,245,0.88)] p-1 shadow-[0_8px_24px_rgba(89,63,49,0.08)]">
            {locales.map((entry) => (
              <Link
                key={entry}
                href={`/${entry}${normalized === '/' ? '' : normalized}`}
                className={cn(
                  'rounded-full px-3 py-2 text-xs tracking-[0.2em]',
                  locale === entry ? 'bg-rose-200 text-taupe-900' : 'text-taupe-700',
                )}
              >
                {localeLabels[entry]}
              </Link>
            ))}
          </div>
          <Link href={`/${locale}/contact`} className="button-primary">
            {nav.reserve}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="rounded-full border border-white/60 bg-[rgba(255,250,245,0.88)] p-3 text-taupe-900 shadow-[0_8px_24px_rgba(89,63,49,0.08)] lg:hidden"
          aria-label="Open menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-taupe-100 bg-cream-50 lg:hidden">
          <div className="section-shell flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <Link key={item.key} href={`/${locale}${item.path}`} className="rounded-2xl px-4 py-3 text-taupe-700 hover:bg-white" onClick={() => setOpen(false)}>
                {nav[item.key]}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              {locales.map((entry) => (
                <Link
                  key={entry}
                  href={`/${entry}${normalized === '/' ? '' : normalized}`}
                  className={cn(
                    'rounded-full px-4 py-2 text-xs tracking-[0.2em]',
                    locale === entry ? 'bg-rose-200 text-taupe-900' : 'bg-white text-taupe-500',
                  )}
                >
                  {localeLabels[entry]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

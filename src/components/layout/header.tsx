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
    <header className="sticky top-0 z-50 border-b border-white/50 bg-[rgba(255,250,245,0.82)] backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <Link href={`/${locale}`} className="min-w-0">
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
                  'rounded-full px-4 py-2 text-sm transition',
                  active ? 'bg-taupe-700 text-cream-50' : 'text-taupe-700 hover:bg-white',
                )}
              >
                {nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex items-center rounded-full border border-taupe-200 bg-white/70 p-1">
            {locales.map((entry) => (
              <Link
                key={entry}
                href={`/${entry}${normalized === '/' ? '' : normalized}`}
                className={cn(
                  'rounded-full px-3 py-2 text-xs tracking-[0.2em]',
                  locale === entry ? 'bg-rose-200 text-taupe-900' : 'text-taupe-500',
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
          className="rounded-full border border-taupe-200 bg-white/70 p-3 lg:hidden"
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

import { ButtonLink } from '@/components/common/button-link';
import type { Locale } from '@/lib/i18n';

export function MobileActionBar({ locale, reserveLabel }: { locale: Locale; reserveLabel: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/70 bg-[rgba(255,250,245,0.88)] px-4 py-2.5 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md justify-center">
        <ButtonLink href={`/${locale}/contact`} className="min-w-0 px-6 py-3 text-sm shadow-[0_14px_30px_rgba(111,83,69,0.18)]">
          {reserveLabel}
        </ButtonLink>
      </div>
    </div>
  );
}

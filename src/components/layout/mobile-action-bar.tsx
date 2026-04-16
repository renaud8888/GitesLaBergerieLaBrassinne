import { ButtonLink } from '@/components/common/button-link';
import type { Locale } from '@/lib/i18n';

export function MobileActionBar({ locale, reserveLabel }: { locale: Locale; reserveLabel: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-taupe-100 bg-[#fbf4ed] px-4 py-3 shadow-[0_-10px_30px_rgba(89,63,49,0.08)] md:hidden">
      <div className="mx-auto flex max-w-sm justify-center">
        <ButtonLink href={`/${locale}/contact`} className="min-w-0 px-6 py-3 text-sm shadow-[0_14px_30px_rgba(111,83,69,0.16)]">
          {reserveLabel}
        </ButtonLink>
      </div>
    </div>
  );
}

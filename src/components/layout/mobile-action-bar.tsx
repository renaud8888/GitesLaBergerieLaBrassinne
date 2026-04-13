import { ButtonLink } from '@/components/common/button-link';
import { WhatsAppIcon } from '@/components/common/brand-icons';
import { siteConfig } from '@/data/site';
import type { Locale } from '@/lib/i18n';

export function MobileActionBar({ locale, reserveLabel }: { locale: Locale; reserveLabel: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/60 bg-[rgba(255,250,245,0.94)] p-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-xl gap-3">
        <ButtonLink href={siteConfig.whatsapp.default} variant="whatsapp" external className="min-w-0 flex-1" icon={<WhatsAppIcon className="h-4 w-4" />}>
          WhatsApp
        </ButtonLink>
        <ButtonLink href={`/${locale}/contact`} className="min-w-0 flex-1">
          {reserveLabel}
        </ButtonLink>
      </div>
    </div>
  );
}

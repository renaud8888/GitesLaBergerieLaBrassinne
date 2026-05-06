import { WhatsAppIcon } from '@/components/common/brand-icons';
import { ButtonLink } from '@/components/common/button-link';
import { getWhatsappLink } from '@/data/site';
import type { Locale } from '@/lib/i18n';

export function MobileActionBar({
  locale,
  reserveLabel,
  whatsappLabel,
}: {
  locale: Locale;
  reserveLabel: string;
  whatsappLabel: string;
}) {
  const whatsappUrl = getWhatsappLink(locale);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-taupe-100 bg-[#fbf4ed] px-4 py-3 shadow-[0_-10px_30px_rgba(89,63,49,0.08)] md:hidden">
      <div className="mx-auto grid max-w-sm grid-cols-2 gap-2">
        <ButtonLink href={`/${locale}/contact`} className="min-w-0 px-4 py-3 text-sm shadow-[0_14px_30px_rgba(111,83,69,0.16)]">
          {reserveLabel}
        </ButtonLink>
        <ButtonLink href={whatsappUrl} variant="whatsapp" external className="min-w-0 px-4 py-3 text-sm" icon={<WhatsAppIcon className="h-4 w-4" />}>
          {whatsappLabel}
        </ButtonLink>
      </div>
    </div>
  );
}

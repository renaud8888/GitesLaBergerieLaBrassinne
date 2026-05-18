import { UsersRound } from 'lucide-react';

import { dualGiteContent } from '@/data/dual-gite';
import type { Locale } from '@/lib/i18n';

export function DualGiteNote({ locale }: { locale: Locale }) {
  const content = dualGiteContent[locale];

  return (
    <div className="surface-card-strong p-5 md:p-6">
      <div className="flex items-start gap-3">
        <span className="inline-flex rounded-full bg-cream-100 p-3 text-wood">
          <UsersRound size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-3xl leading-none text-taupe-900">{content.title}</p>
          <p className="mt-3 text-sm leading-7 text-taupe-500">{content.text}</p>
        </div>
      </div>
    </div>
  );
}

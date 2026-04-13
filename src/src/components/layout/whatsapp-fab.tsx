import { MessageCircle } from 'lucide-react';

import { siteConfig } from '@/data/site';

export function WhatsappFab() {
  return (
    <a
      href={siteConfig.whatsapp.default}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.35)] md:inline-flex"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}

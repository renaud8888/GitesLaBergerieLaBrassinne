import type { Metadata } from 'next';

import { BookingPage, createBookingMetadata } from '@/components/booking/booking-page';
import type { Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;

  return createBookingMetadata(locale);
}

export default async function ReserverenAliasPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return <BookingPage locale={locale} />;
}

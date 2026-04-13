import type { Metadata } from 'next';

import '@/app/globals.css';

import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description:
    'Deux gîtes romantiques de charme à Libin, dans les Ardennes belges, pour une escapade chaleureuse, élégante et pleine de douceur.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

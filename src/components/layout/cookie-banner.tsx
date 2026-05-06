'use client';

type CookieBannerProps = {
  enabled?: boolean;
};

export function CookieBanner({ enabled = false }: CookieBannerProps) {
  if (!enabled) {
    return null;
  }

  return null;
}

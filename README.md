# La Bergerie & La Brassine

Site Next.js multilingue pour deux gites de charme a Libin, concu pour un deploiement simple sur Vercel.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- i18n par routes localisees: `/fr`, `/en`, `/nl`

## Lancer le projet

```bash
npm install
npm run dev
```

## Structure

- `src/app/[locale]` : pages localisees
- `src/components` : composants UI reutilisables
- `src/content/locales` : contenus FR / EN / NL
- `src/data` : donnees globales du site
- `public/images` : arborescence d'images prete a recevoir les vrais visuels

## Images

Les composants gerent deja les images manquantes avec un fallback visuel. Tu peux donc remplacer progressivement les placeholders par tes vraies photos dans:

- `public/images/home`
- `public/images/la-bergerie`
- `public/images/la-brassine`
- `public/images/around`
- `public/images/branding`

Le logo est attendu dans `public/images/branding/logo-placeholder.png`.

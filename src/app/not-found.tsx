import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8f1e9_0%,#fffaf5_45%,#f3e2dc_100%)] px-6 py-16 text-taupe-900">
      <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center">
        <section className="w-full rounded-[2rem] border border-white/70 bg-white/78 p-8 shadow-[0_30px_80px_rgba(89,63,49,0.12)] backdrop-blur md:p-12">
          <p className="text-xs uppercase tracking-[0.35em] text-wood">Erreur 404</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Cette page n&apos;existe pas.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-taupe-500 md:text-lg">
            Le lien est peut-être incomplet, ou la page a été déplacée. Vous pouvez revenir à l&apos;accueil du site et
            reprendre la visite à partir de la version française.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/fr"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d8d2,#eec3be)] px-6 py-3 text-sm font-semibold text-taupe-900 shadow-[0_18px_40px_rgba(240,201,198,0.34)] transition hover:translate-y-[-1px]"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/fr/contact"
              className="inline-flex items-center justify-center rounded-full border border-taupe-200 bg-white px-6 py-3 text-sm font-semibold text-taupe-700 transition hover:border-rose-200 hover:bg-rose-50"
            >
              Nous contacter
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

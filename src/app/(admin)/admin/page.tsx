import { redirect } from 'next/navigation';

import { AdminEditor } from '@/components/admin/admin-editor';
import { AdminLoginForm } from '@/components/admin/admin-login-form';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getAdminContentEntries, getContentStorageMode } from '@/lib/content-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();
  const storageMode = getContentStorageMode();

  if (!process.env.ADMIN_PASSWORD) {
    return (
      <main className="section-shell py-16">
        <div className="surface-card-strong mx-auto max-w-2xl p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-wood">Configuration requise</p>
          <h1 className="mt-3 font-display text-4xl text-taupe-900">Admin indisponible</h1>
          <p className="mt-4 text-base leading-8 text-taupe-500">
            Définissez la variable d’environnement <code>ADMIN_PASSWORD</code> pour activer la page d’administration protégée.
          </p>
        </div>
      </main>
    );
  }

  if (storageMode === 'missing-vercel-blob') {
    return (
      <main className="section-shell py-16">
        <div className="surface-card-strong mx-auto max-w-2xl p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-wood">Configuration requise</p>
          <h1 className="mt-3 font-display text-4xl text-taupe-900">Stockage Vercel manquant</h1>
          <p className="mt-4 text-base leading-8 text-taupe-500">
            Sur Vercel, l’administration a besoin de la variable d’environnement <code>BLOB_READ_WRITE_TOKEN</code> pour sauvegarder les modifications de contenu.
          </p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="section-shell py-16">
        <AdminLoginForm />
      </main>
    );
  }

  const entries = await getAdminContentEntries();

  if (!entries.length) {
    redirect('/');
  }

  return (
    <main className="section-shell py-12 md:py-16">
      <AdminEditor initialEntries={entries} />
    </main>
  );
}

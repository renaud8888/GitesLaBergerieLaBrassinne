'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="surface-card-strong mx-auto grid max-w-md gap-5 p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setError('');

        startTransition(async () => {
          const response = await fetch('/api/admin/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
          });

          if (!response.ok) {
            setError('Mot de passe incorrect.');
            return;
          }

          router.refresh();
        });
      }}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-wood">Administration</p>
        <h1 className="mt-3 font-display text-4xl text-taupe-900">Accès protégé</h1>
        <p className="mt-3 text-sm leading-7 text-taupe-500">
          Connectez-vous avec le mot de passe d’administration défini côté serveur pour modifier les contenus du site.
        </p>
      </div>

      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium">Mot de passe</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 outline-none transition focus:border-rose-300 focus:bg-white"
          required
        />
      </label>

      <button type="submit" className="button-primary bg-sage text-white" disabled={isPending}>
        {isPending ? 'Connexion...' : 'Se connecter'}
      </button>

      {error ? <p className="text-sm text-[#8b3f39]">{error}</p> : null}
    </form>
  );
}

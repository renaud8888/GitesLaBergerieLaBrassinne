'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

type AdminEntry = {
  key: string;
  label: string;
  group: string;
  locale?: 'fr' | 'en' | 'nl';
  type: 'text' | 'image';
  value: string;
  defaultValue: string;
};

export function AdminEditor({ initialEntries }: { initialEntries: AdminEntry[] }) {
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries);
  const [search, setSearch] = useState('');
  const [localeFilter, setLocaleFilter] = useState<'all' | 'fr' | 'en' | 'nl' | 'images'>('all');
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKeys, setSavedKeys] = useState<Record<string, boolean>>({});
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch =
        !search ||
        entry.label.toLowerCase().includes(search.toLowerCase()) ||
        entry.key.toLowerCase().includes(search.toLowerCase()) ||
        entry.value.toLowerCase().includes(search.toLowerCase());

      const matchesLocale =
        localeFilter === 'all' ||
        (localeFilter === 'images' ? entry.type === 'image' : entry.locale === localeFilter);

      return matchesSearch && matchesLocale;
    });
  }, [entries, localeFilter, search]);

  const groupedEntries = useMemo(() => {
    return filteredEntries.reduce<Record<string, AdminEntry[]>>((groups, entry) => {
      groups[entry.group] ??= [];
      groups[entry.group].push(entry);
      return groups;
    }, {});
  }, [filteredEntries]);

  return (
    <div className="grid gap-8">
      <div className="surface-card-strong grid gap-5 p-6 md:grid-cols-[1fr_auto_auto] md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-wood">Administration</p>
          <h1 className="mt-3 font-display text-4xl text-taupe-900">Contenus éditables</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-taupe-500">
            Chaque champ affiche la valeur actuelle du site. Si vous remettez la valeur d’origine, le site repasse automatiquement sur son contenu par défaut.
          </p>
        </div>

        <label className="grid gap-2 text-sm text-taupe-700">
          <span className="font-medium">Filtrer</span>
          <select
            value={localeFilter}
            onChange={(event) => setLocaleFilter(event.target.value as typeof localeFilter)}
            className="rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3 text-taupe-900 outline-none"
          >
            <option value="all">Tout afficher</option>
            <option value="fr">Textes FR</option>
            <option value="en">Textes EN</option>
            <option value="nl">Textes NL</option>
            <option value="images">Images</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm text-taupe-700">
          <span className="font-medium">Recherche</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Titre, clé, texte..."
            className="rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3 text-taupe-900 outline-none"
          />
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-full border border-taupe-200 bg-white px-5 py-3 text-sm text-taupe-700 transition hover:bg-cream-50"
          onClick={() => {
            startTransition(async () => {
              await fetch('/api/admin/session', { method: 'DELETE' });
              router.refresh();
            });
          }}
          disabled={isPending}
        >
          Déconnexion
        </button>
      </div>

      {Object.entries(groupedEntries).map(([group, groupEntries]) => (
        <section key={group} className="grid gap-4">
          <div>
            <h2 className="font-display text-3xl text-taupe-900">{group}</h2>
            <p className="mt-2 text-sm text-taupe-500">{groupEntries.length} champ(s)</p>
          </div>

          <div className="grid gap-4">
            {groupEntries.map((entry) => {
              const isDirty = entry.value !== entry.defaultValue;
              const isSaving = savingKey === entry.key;
              const isSaved = savedKeys[entry.key];
              const hasError = errorKey === entry.key;
              const useTextarea = entry.type === 'text' && (entry.value.length > 120 || entry.value.includes('\n'));

              return (
                <article key={entry.key} className="surface-card-strong grid gap-4 p-6">
                  <div>
                    <p className="font-display text-2xl text-taupe-900">{entry.label}</p>
                    <p className="mt-2 break-all text-xs uppercase tracking-[0.18em] text-taupe-400">{entry.key}</p>
                  </div>

                  {entry.type === 'image' ? (
                    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
                      <div className="overflow-hidden rounded-[1.4rem] border border-taupe-100 bg-white">
                        {entry.value ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={entry.value} alt={entry.label} className="h-44 w-full object-cover" />
                        ) : (
                          <div className="flex h-44 items-center justify-center text-sm text-taupe-500">Aucune image</div>
                        )}
                      </div>
                      <input
                        value={entry.value}
                        onChange={(event) => {
                          const nextValue = event.target.value;
                          setEntries((current) => current.map((item) => (item.key === entry.key ? { ...item, value: nextValue } : item)));
                          setSavedKeys((current) => ({ ...current, [entry.key]: false }));
                          setErrorKey((current) => (current === entry.key ? null : current));
                        }}
                        className="rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 outline-none transition focus:border-rose-300 focus:bg-white"
                      />
                    </div>
                  ) : useTextarea ? (
                    <textarea
                      value={entry.value}
                      onChange={(event) => {
                        const nextValue = event.target.value;
                        setEntries((current) => current.map((item) => (item.key === entry.key ? { ...item, value: nextValue } : item)));
                        setSavedKeys((current) => ({ ...current, [entry.key]: false }));
                        setErrorKey((current) => (current === entry.key ? null : current));
                      }}
                      className="min-h-36 rounded-[1.35rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 outline-none transition focus:border-rose-300 focus:bg-white"
                    />
                  ) : (
                    <input
                      value={entry.value}
                      onChange={(event) => {
                        const nextValue = event.target.value;
                        setEntries((current) => current.map((item) => (item.key === entry.key ? { ...item, value: nextValue } : item)));
                        setSavedKeys((current) => ({ ...current, [entry.key]: false }));
                        setErrorKey((current) => (current === entry.key ? null : current));
                      }}
                      className="rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 outline-none transition focus:border-rose-300 focus:bg-white"
                    />
                  )}

                  <div className="grid gap-2 text-sm text-taupe-500">
                    <p>{isDirty ? 'Valeur modifiée' : 'Valeur par défaut actuellement utilisée'}</p>
                    {isDirty ? <p>Valeur initiale: {entry.defaultValue}</p> : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      className={`rounded-full px-5 py-3 text-sm font-medium text-white transition ${
                        isSaved ? 'bg-sage shadow-[0_14px_28px_rgba(91,135,105,0.24)]' : 'bg-[#5b8769] shadow-[0_14px_28px_rgba(91,135,105,0.24)] hover:bg-[#50795d]'
                      }`}
                      disabled={isSaving}
                      onClick={() => {
                        setSavingKey(entry.key);
                        setErrorKey(null);

                        startTransition(async () => {
                          const response = await fetch('/api/admin/content', {
                            method: 'PATCH',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              key: entry.key,
                              value: entry.value,
                            }),
                          });

                          if (!response.ok) {
                            setErrorKey(entry.key);
                            setSavingKey(null);
                            return;
                          }

                          setSavedKeys((current) => ({ ...current, [entry.key]: true }));
                          setSavingKey(null);
                          router.refresh();
                        });
                      }}
                    >
                      {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </button>

                    {isSaved ? <p className="text-sm text-sage">Modifications enregistrées</p> : null}
                    {hasError ? <p className="text-sm text-[#8b3f39]">Impossible d’enregistrer ce champ.</p> : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

'use client';

import { useState } from 'react';

import { siteConfig } from '@/data/site';
import type { ContactRequestPayload } from '@/lib/contact-request';

type ContactFormProps = {
  labels: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dates: string;
    gite: string;
    guests: string;
    message: string;
    submit: string;
    success: string;
    sending: string;
    invalid: string;
    error: string;
    options: {
      bergerie: string;
      brassine: string;
      undecided: string;
    };
  };
};

type ApiResult = {
  success?: boolean;
  message?: string;
  error?: string;
  destinationEmail?: string;
};

export function ContactForm({ labels }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [showFallback, setShowFallback] = useState(false);

  return (
    <form
      className="surface-card-strong grid gap-4 p-5 md:grid-cols-2 md:p-8"
      onSubmit={async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const payload = Object.fromEntries(formData.entries()) as Record<string, string>;
        const requestPayload: ContactRequestPayload = {
          firstName: payload.firstName ?? '',
          lastName: payload.lastName ?? '',
          email: payload.email ?? '',
          phone: payload.phone ?? '',
          dates: payload.dates ?? '',
          gite: payload.gite ?? 'undecided',
          guests: payload.guests ?? '2',
          message: payload.message ?? '',
          company: payload.company ?? '',
        };

        setStatus('loading');
        setFeedback(labels.sending);
        setShowFallback(false);

        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestPayload),
          });

          let result: ApiResult | null = null;

          try {
            result = await response.json();
          } catch {
            result = null;
          }

          if (response.ok && result?.success === true) {
            setStatus('success');
            setFeedback(result.message || labels.success);
            setShowFallback(false);
            event.currentTarget.reset();
            return;
          }

          if (response.status === 400 && (result?.error === 'missing_required_fields' || result?.error === 'invalid_email')) {
            setStatus('error');
            setFeedback(result?.message || labels.invalid);
            setShowFallback(false);
            return;
          }

          setStatus('error');
          setFeedback(labels.error.replace('{email}', result?.destinationEmail || siteConfig.email));
          setShowFallback(true);
        } catch {
          setStatus('error');
          setFeedback(labels.error.replace('{email}', siteConfig.email));
          setShowFallback(true);
        }
      }}
    >
      <div className="md:col-span-2">
        <p className="text-sm leading-7 text-taupe-500">Quelques informations suffisent pour revenir vers vous rapidement, en direct ou via Airbnb si vous le préférez.</p>
      </div>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.firstName}</span>
        <input className="rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300 focus:bg-white" name="firstName" required />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.lastName}</span>
        <input className="rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300 focus:bg-white" name="lastName" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.email}</span>
        <input className="rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300 focus:bg-white" name="email" type="email" required />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.phone}</span>
        <input className="rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300 focus:bg-white" name="phone" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.dates}</span>
        <input className="rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300 focus:bg-white" name="dates" placeholder="Ex. 12 au 14 septembre" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.gite}</span>
        <select className="rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300 focus:bg-white" name="gite" defaultValue="undecided">
          <option value="bergerie">{labels.options.bergerie}</option>
          <option value="brassine">{labels.options.brassine}</option>
          <option value="undecided">{labels.options.undecided}</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.guests}</span>
        <input className="rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300 focus:bg-white" name="guests" type="number" min="1" max="2" defaultValue="2" />
      </label>
      <label className="hidden" aria-hidden="true">
        <span>Company</span>
        <input tabIndex={-1} autoComplete="off" name="company" />
      </label>
      <div className="rounded-[1.35rem] border border-rose-200/40 bg-rose-100/72 p-4 text-sm leading-7 text-taupe-600">
        Réponse rapide, ton chaleureux et possibilité de réserver en direct ou de basculer sur Airbnb selon votre préférence.
      </div>
      <label className="grid gap-2 text-sm text-taupe-700 md:col-span-2">
        <span className="font-medium tracking-[0.01em]">{labels.message}</span>
        <textarea className="min-h-40 rounded-[1.35rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300 focus:bg-white" name="message" required />
      </label>
      <div className="md:col-span-2 flex flex-col gap-3">
        <button type="submit" className="button-primary w-full md:w-fit" disabled={status === 'loading'}>
          {status === 'loading' ? labels.sending : labels.submit}
        </button>
        {feedback ? (
          <div className={`text-sm ${status === 'success' ? 'text-sage' : 'text-taupe-700'}`} aria-live="polite">
            <p>{feedback}</p>
            {showFallback ? (
              <p className="mt-2">
                <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-2">
                  {siteConfig.email}
                </a>
                {' · '}
                <a href={siteConfig.whatsapp.default} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                  WhatsApp
                </a>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </form>
  );
}

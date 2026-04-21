'use client';

import { useRef, useState } from 'react';

import { getWhatsappLink, siteConfig } from '@/data/site';
import type { ContactRequestPayload } from '@/lib/contact-request';
import type { Locale } from '@/lib/i18n';

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
  ui: {
    intro: string;
    reassurance: string;
  };
  locale: Locale;
};

type ApiResult = {
  success?: boolean;
  message?: string;
  error?: string;
};

export function ContactForm({ labels, ui, locale }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [showFallback, setShowFallback] = useState(false);
  const isSubmittingRef = useRef(false);

  return (
    <form
      className="surface-card-strong grid gap-4 p-5 md:grid-cols-2 md:p-8"
      onSubmit={async (event) => {
        event.preventDefault();

        if (isSubmittingRef.current) {
          console.warn('[contact-form] duplicate submit prevented');
          return;
        }

        const form = event.currentTarget;
        const formData = new FormData(form);
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

        isSubmittingRef.current = true;
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
          let rawBody = '';
          let jsonParseFailed = false;

          try {
            rawBody = await response.text();
            result = rawBody ? JSON.parse(rawBody) as ApiResult : null;
          } catch {
            jsonParseFailed = true;
            result = null;
          }

          const apiMarkedError = result?.success === false;
          const requestSucceeded = response.ok && !apiMarkedError;

          console.info('[contact-form] submit result', {
            status: response.status,
            ok: response.ok,
            redirected: response.redirected,
            url: response.url,
            rawBody,
            json: result,
            jsonParseFailed,
          });

          if (requestSucceeded) {
            console.info('[contact-form] success branch');
            setStatus('success');
            setFeedback(result?.message || labels.success);
            setShowFallback(false);
            form.reset();
            isSubmittingRef.current = false;
            return;
          }

          if (response.status === 400 && (result?.error === 'missing_required_fields' || result?.error === 'invalid_email')) {
            console.info('[contact-form] validation error branch');
            setStatus('error');
            setFeedback(result?.message || labels.invalid);
            setShowFallback(false);
            isSubmittingRef.current = false;
            return;
          }

          console.error('[contact-form] error branch', {
            status: response.status,
            ok: response.ok,
            redirected: response.redirected,
            url: response.url,
            rawBody,
            json: result,
            jsonParseFailed,
          });
          setStatus('error');
          setFeedback(labels.error.replace('{email}', siteConfig.email));
          setShowFallback(true);
          isSubmittingRef.current = false;
          return;
        } catch (error) {
          console.error('[contact-form] network error branch', error);
          setStatus('error');
          setFeedback(labels.error.replace('{email}', siteConfig.email));
          setShowFallback(true);
          isSubmittingRef.current = false;
          return;
        }
      }}
    >
      <div className="md:col-span-2">
        <p className="text-sm leading-7 text-taupe-500">{ui.intro}</p>
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
      <label className="sr-only" aria-hidden="true">
        <span>Company</span>
        <input tabIndex={-1} autoComplete="off" name="company" />
      </label>
      <div className="rounded-[1.35rem] border border-rose-200/40 bg-rose-100/72 p-4 text-sm leading-7 text-taupe-600">
        {ui.reassurance}
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
                <a href={getWhatsappLink(locale)} target="_blank" rel="noreferrer" className="underline underline-offset-2">
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

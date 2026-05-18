'use client';

import { useRef, useState } from 'react';
import { Mail } from 'lucide-react';

import { getWhatsappLink, siteConfig } from '@/data/site';
import { WhatsAppIcon } from '@/components/common/brand-icons';
import type { ContactRequestPayload } from '@/lib/contact-request';
import type { Locale } from '@/lib/i18n';

type ContactFormProps = {
  labels: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    consent: string;
    submit: string;
    success: string;
    sending: string;
    invalid: string;
    error: string;
    responsePreference: string;
    privacy: string;
  };
  locale: Locale;
};

type ApiResult = {
  success?: boolean;
  message?: string;
  error?: string;
};

const inputClass = 'rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300 focus:bg-white';

export function ContactForm({ labels, locale }: ContactFormProps) {
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
          dates: '',
          gite: '',
          guests: '',
          message: [payload.subject ? `Sujet: ${payload.subject}` : '', payload.message ?? ''].filter(Boolean).join('\n\n'),
          consent: payload.consent === 'accepted',
          requestType: 'contact',
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

          try {
            rawBody = await response.text();
            result = rawBody ? JSON.parse(rawBody) as ApiResult : null;
          } catch {
            result = null;
          }

          const apiMarkedError = result?.success === false;
          const requestSucceeded = response.ok && !apiMarkedError;

          if (requestSucceeded) {
            setStatus('success');
            setFeedback(labels.success);
            setShowFallback(false);
            form.reset();
            isSubmittingRef.current = false;
            return;
          }

          if (response.status === 400 && (result?.error === 'missing_required_fields' || result?.error === 'invalid_email' || result?.error === 'missing_consent')) {
            setStatus('error');
            setFeedback(result?.message || labels.invalid);
            setShowFallback(false);
            isSubmittingRef.current = false;
            return;
          }

          setStatus('error');
          setFeedback(labels.error.replace('{email}', siteConfig.email));
          setShowFallback(true);
          isSubmittingRef.current = false;
          return;
        } catch {
          setStatus('error');
          setFeedback(labels.error.replace('{email}', siteConfig.email));
          setShowFallback(true);
          isSubmittingRef.current = false;
          return;
        }
      }}
    >
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.firstName} *</span>
        <input className={inputClass} name="firstName" autoComplete="given-name" required aria-required="true" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.lastName} *</span>
        <input className={inputClass} name="lastName" autoComplete="family-name" required aria-required="true" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.email} *</span>
        <input className={inputClass} name="email" type="email" autoComplete="email" required aria-required="true" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.phone}</span>
        <input className={inputClass} name="phone" type="tel" autoComplete="tel" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.subject} *</span>
        <input className={inputClass} name="subject" autoComplete="off" required aria-required="true" />
      </label>
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        <label>
          <span>Company</span>
          <input tabIndex={-1} autoComplete="off" name="company" aria-hidden="true" />
        </label>
      </div>
      <label className="grid gap-2 text-sm text-taupe-700 md:col-span-2">
        <span className="font-medium tracking-[0.01em]">{labels.message} *</span>
        <textarea className="min-h-40 rounded-[1.35rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300 focus:bg-white" name="message" required aria-required="true" />
      </label>
      <label className="flex items-start gap-3 rounded-[1.25rem] border border-taupe-100 bg-white/78 p-4 text-sm leading-6 text-taupe-700 md:col-span-2">
        <input className="mt-1 h-4 w-4 rounded border-taupe-300 accent-taupe-900" type="checkbox" name="consent" value="accepted" required aria-required="true" />
        <span>{labels.consent} *</span>
      </label>
      <div className="md:col-span-2 flex flex-col gap-3">
        <div className="rounded-[1.25rem] border border-rose-200/60 bg-rose-50/60 p-4 text-sm leading-7 text-taupe-700">
          <p>{labels.responsePreference}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-taupe-500">{labels.privacy}</p>
        </div>
        <button type="submit" className="button-primary w-full md:w-fit" disabled={status === 'loading'}>
          {status === 'loading' ? labels.sending : labels.submit}
        </button>
        {feedback ? (
          <div className={`text-sm ${status === 'success' ? 'text-sage' : 'text-taupe-700'}`} aria-live="polite">
            <p>{feedback}</p>
            {showFallback ? (
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={`mailto:${siteConfig.email}`} className="button-secondary px-4 py-2.5 text-xs">
                  <Mail className="h-4 w-4" />
                  <span>E-mail</span>
                </a>
                <a href={getWhatsappLink(locale)} target="_blank" rel="noopener noreferrer" className="button-whatsapp px-4 py-2.5 text-xs">
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </form>
  );
}

'use client';

import { useRef, useState } from 'react';
import { Mail } from 'lucide-react';

import { WhatsAppIcon } from '@/components/common/brand-icons';
import { getBookingWhatsappLink } from '@/data/booking';
import { siteConfig } from '@/data/site';
import type { ContactRequestPayload } from '@/lib/contact-request';
import type { Locale } from '@/lib/i18n';

type BookingFormLabels = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  arrivalDate: string;
  departureDate: string;
  gite: string;
  guests: string;
  contactPreference: string;
  occasion: string;
  message: string;
  consent: string;
  submit: string;
  sending: string;
  success: string;
  invalid: string;
  error: string;
  reassurance: string;
  privacy: string;
  fastAnswer: string;
};

type BookingFormOptions = {
  bergerie: string;
  brassine: string;
  both: string;
  undecided: string;
  whatsapp: string;
  email: string;
  phone: string;
  romantic: string;
  birthday: string;
  surprise: string;
  rest: string;
  other: string;
  none: string;
};

type BookingFormProps = {
  labels: BookingFormLabels;
  options: BookingFormOptions;
  locale: Locale;
};

type ApiResult = {
  success?: boolean;
  message?: string;
  error?: string;
};

const inputClass = 'rounded-[1.2rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300 focus:bg-white';

export function BookingForm({ labels, options, locale }: BookingFormProps) {
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
        const arrivalDate = payload.arrivalDate ?? '';
        const departureDate = payload.departureDate ?? '';
        const requestPayload: ContactRequestPayload = {
          firstName: payload.firstName ?? '',
          lastName: payload.lastName ?? '',
          email: payload.email ?? '',
          phone: payload.phone ?? '',
          dates: [arrivalDate, departureDate].filter(Boolean).join(' - '),
          arrivalDate,
          departureDate,
          gite: payload.gite ?? 'undecided',
          guests: payload.guests ?? '2',
          contactPreference: payload.contactPreference ?? '',
          occasion: payload.occasion ?? '',
          message: payload.message ?? '',
          consent: payload.consent === 'accepted',
          requestType: 'booking',
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
          const rawBody = await response.text();

          try {
            result = rawBody ? JSON.parse(rawBody) as ApiResult : null;
          } catch {
            result = null;
          }

          const requestSucceeded = response.ok && result?.success !== false;

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
        } catch {
          setStatus('error');
          setFeedback(labels.error.replace('{email}', siteConfig.email));
          setShowFallback(true);
          isSubmittingRef.current = false;
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
        <span className="font-medium tracking-[0.01em]">{labels.gite}</span>
        <select className={inputClass} name="gite" defaultValue="undecided">
          <option value="bergerie">{options.bergerie}</option>
          <option value="brassine">{options.brassine}</option>
          <option value="both">{options.both}</option>
          <option value="undecided">{options.undecided}</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.guests}</span>
        <input className={inputClass} name="guests" type="number" min="1" max="4" defaultValue="2" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.arrivalDate}</span>
        <input className={inputClass} name="arrivalDate" type="date" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.departureDate}</span>
        <input className={inputClass} name="departureDate" type="date" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.contactPreference}</span>
        <select className={inputClass} name="contactPreference" defaultValue="whatsapp">
          <option value="whatsapp">{options.whatsapp}</option>
          <option value="email">{options.email}</option>
          <option value="phone">{options.phone}</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium tracking-[0.01em]">{labels.occasion}</span>
        <select className={inputClass} name="occasion" defaultValue="none">
          <option value="romantic">{options.romantic}</option>
          <option value="birthday">{options.birthday}</option>
          <option value="surprise">{options.surprise}</option>
          <option value="rest">{options.rest}</option>
          <option value="other">{options.other}</option>
          <option value="none">{options.none}</option>
        </select>
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
        <span className="font-medium tracking-[0.01em]">{labels.message}</span>
        <textarea className="min-h-36 rounded-[1.35rem] border border-taupe-200 bg-white/92 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300 focus:bg-white" name="message" />
      </label>
      <label className="flex items-start gap-3 rounded-[1.25rem] border border-taupe-100 bg-white/78 p-4 text-sm leading-6 text-taupe-700 md:col-span-2">
        <input className="mt-1 h-4 w-4 rounded border-taupe-300 accent-taupe-900" type="checkbox" name="consent" value="accepted" required aria-required="true" />
        <span>{labels.consent} *</span>
      </label>
      <div className="flex flex-col gap-3 md:col-span-2">
        <div className="rounded-[1.25rem] border border-rose-200/60 bg-rose-50/60 p-4 text-sm leading-7 text-taupe-700">
          <p>{labels.reassurance}</p>
          <p className="mt-2">{labels.fastAnswer}</p>
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
                <a href={getBookingWhatsappLink(locale)} target="_blank" rel="noopener noreferrer" className="button-whatsapp px-4 py-2.5 text-xs">
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

'use client';

import { useState } from 'react';

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
    options: {
      bergerie: string;
      brassine: string;
      undecided: string;
    };
  };
};

export function ContactForm({ labels }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="surface-card-strong grid gap-4 p-5 md:grid-cols-2 md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium">{labels.firstName}</span>
        <input className="rounded-[1.2rem] border border-taupe-200 bg-white/90 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300" name="firstName" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium">{labels.lastName}</span>
        <input className="rounded-[1.2rem] border border-taupe-200 bg-white/90 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300" name="lastName" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium">{labels.email}</span>
        <input className="rounded-[1.2rem] border border-taupe-200 bg-white/90 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300" name="email" type="email" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium">{labels.phone}</span>
        <input className="rounded-[1.2rem] border border-taupe-200 bg-white/90 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300" name="phone" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium">{labels.dates}</span>
        <input className="rounded-[1.2rem] border border-taupe-200 bg-white/90 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300" name="dates" placeholder="Ex. 12 au 14 septembre" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium">{labels.gite}</span>
        <select className="rounded-[1.2rem] border border-taupe-200 bg-white/90 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300" name="gite" defaultValue="undecided">
          <option value="bergerie">{labels.options.bergerie}</option>
          <option value="brassine">{labels.options.brassine}</option>
          <option value="undecided">{labels.options.undecided}</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span className="font-medium">{labels.guests}</span>
        <input className="rounded-[1.2rem] border border-taupe-200 bg-white/90 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300" name="guests" type="number" min="1" max="2" defaultValue="2" />
      </label>
      <div className="rounded-[1.35rem] border border-rose-200/40 bg-rose-100/72 p-4 text-sm leading-7 text-taupe-600">
        Réponse rapide, ton chaleureux et possibilité de réserver en direct ou de basculer sur Airbnb selon votre préférence.
      </div>
      <label className="grid gap-2 text-sm text-taupe-700 md:col-span-2">
        <span className="font-medium">{labels.message}</span>
        <textarea className="min-h-40 rounded-[1.35rem] border border-taupe-200 bg-white/90 px-4 py-3.5 text-taupe-900 shadow-[0_8px_20px_rgba(89,63,49,0.05)] outline-none transition focus:border-rose-300" name="message" />
      </label>
      <div className="md:col-span-2 flex flex-col gap-3">
        <button type="submit" className="button-primary w-full md:w-fit">
          {labels.submit}
        </button>
        {submitted ? <p className="text-sm text-sage">{labels.success}</p> : null}
      </div>
    </form>
  );
}
